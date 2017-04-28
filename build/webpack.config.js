'use strict';

const webpack = require('webpack'); //webpack模块;
const path = require('path'); //node 路径模块;
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //独立打包css模块;
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html模板模块;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩CSS模块;

module.exports = {
//	context: path.resolve(__dirname, './src/js'), //设置原始文件目录;
	devtool: 'source-map',
	target:"web",
	entry: { //打包入口;
		commons:['lib/jquery-2.1.0.js','lib/bootstrap/js/bootstrap.min.js','lib/vue.js'],
		app: path.resolve(__dirname, '../src/views/index/index.js'), //打包js;
		test:path.resolve(__dirname, '../src/views/test/index.js')
	},
	output: { //打包出口;
		publicPath: "/wechat-html/", //配合devServer本地Server;
		path: path.resolve(__dirname, '../dist/'), //出口地址;
		filename: 'js/[name].bundle.js?v=[hash]', //出口文件名;
	},
	module: { //模块;
		rules: [ //原 webpack@1 里 loaders;
			{
				//正则匹配后缀.js文件;
				test: /\.js$/,
				//需要排除的目录        
				exclude: /node_modules/,
				//加载babel-loader转译es6
				use: [{
					loader: 'babel-loader',
					//配置参数;
					options: {
						presets: ['es2015'],
						plugins: [["component", [
						    {
						      "libraryName": "element-ui",
						      "styleLibraryName": "theme-default"
						    }
						]]]
					}
				}],
			},
			{
				//正则匹配后缀.css文件;
				test: /\.css$/,
				//使用html-webpack-plugin插件独立css到一个文件;
				use: ExtractTextPlugin.extract({
					//加载css-loader、postcss-loader（编译顺序从下往上）转译css
					use: [{
							loader: 'css-loader?importLoaders=1',
						},
						{
							loader: 'postcss-loader',
							//配置参数;
							options: {
								//从postcss插件autoprefixer 添加css3前缀;
								plugins: function() {
									return [
										//加载autoprefixer并配置前缀,可加载更多postcss插件;
										require('autoprefixer')({
											browsers: ['ios >= 7.0']
										})
									];
								}
							}
						}]
				})
			},
			{
				//正则匹配后缀.less文件;
				test: /\.less$/,
				//使用html-webpack-plugin插件独立css到一个文件;
				use: ExtractTextPlugin.extract({
					use: [{
							loader: 'css-loader?importLoaders=1',
						},
						{
							loader: 'postcss-loader',
							//配置参数;
							options: {
								plugins: function() {
									return [
										require('autoprefixer')({
											browsers: ['ios >= 7.0']
										})
									];
								}
							}
						},
						//加载less-loader同时也得安装less;
						"less-loader"
					]
				})
			},
			{
				//正则匹配后缀.png、.jpg、.gif图片文件;
				test: /\.(png|jpg|gif)$/i,
				use: [{
						//加载url-loader 同时安装 file-loader;
						loader: 'url-loader',
						options: {
							//小于10000K的图片文件转base64到css里,当然css文件体积更大;
							limit: 10000,
							//设置最终img路径;
							name: 'img/[name].[ext]'
						}
					},
					{
						//压缩图片(另一个压缩图片：image-webpack-loader);
						loader: 'img-loader?minimize&optimizationLevel=5&progressive=true'
					},

				]
			},
			{
				//正则匹配字体文件;
				test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
				use: {
					//加载url-loader 同时安装 file-loader;
					loader: 'url-loader',
					options: {
						//小于10000K的图片文件转base64到css里,当然css文件体积更大;
						limit: 10000,
						//设置最终font路径;
						name: 'font/[name].[ext]'
					}
				}
			},
			{
				//html片段拼接;
				test: /\.vue$/,
				use: {
					loader: 'vue-loader',
				}
			},
			{
				//html片段拼接;
				test: /\.html$/,
				use: {
					loader: 'html-withimg-loader',
				}
			}
		]
	},
	plugins: [ //插件;
		new webpack.DefinePlugin({
	      	'process.env': {
	       		NODE_ENV: '"production"'
	      	}
	    }),
		//模板插件
		new HtmlWebpackPlugin({
			filename: 'index.html', //设置最后生成文件名称;
			template: path.resolve(__dirname,'../src/views/index/index.ejs'),
			chunks:['commons','app']
		}),
		new HtmlWebpackPlugin({
			filename: 'test.html', //设置最后生成文件名称;
			template: path.resolve(__dirname,'../src/views/test/index.html'), //设置原文件;
			chunks:['commons','test']
		}),
		//独立打包css插件;
		new ExtractTextPlugin({
			filename: 'css/styles.css?v=[hash]' //设置最后css路径、名称;
		}),
		//压缩css（注:因为没有用style-loader打包到js里所以webpack.optimize.UglifyJsPlugin的压缩本身对独立css不管用）;
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g, //正则匹配后缀.css文件;
			cssProcessor: require('cssnano'), //加载‘cssnano’css优化插件;
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				}
			}, //插件设置,删除所有注释;
			canPrint: true //设置是否可以向控制台打日志,默认为true;
		}),
		new webpack.optimize.CommonsChunkPlugin({
		    name: 'commons', // 这公共代码的chunk名为'commons'
		    filename: 'js/[name].bundle.js', // 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了
		    minChunks: 4, // 设定要有4个chunk（即4个页面）加载的js模块才会被纳入公共代码。这数目自己考虑吧，我认为3-5比较合适。
	  	}),
		//webpack内置js压缩插件;
//		new webpack.optimize.UglifyJsPlugin({
//			compress: { //压缩;
//				warnings: false //关闭警告;
//			}
//		}),
		//webpack内置自动加载插件配合resolve.alias做全局插件;
		new webpack.ProvidePlugin({
			vue: 'lib/vue.js',
			jQuery:'lib/jquery-2.1.0.js'//path.resolve(__dirname, '../src/lib/jquery-2.1.0.js')//文件里遇见‘$’加载jquery;
		})
	],
	devServer: { //设置本地Server;
		contentBase: path.join(__dirname, 'dist'), //设置启动文件目录;
		port: 8080, //设置端口号；
		compress: true, //设置gzip压缩;
		//inline:true,  //开启更新客户端入口(可在package.json scripts 里设置 npm run xxx);
		//hot: true    //设置热更新(可在package.json scripts 里设置 npm run xxx);
	},
	resolve: {
		//设置可省略文件后缀名(注:如果有文件没有后缀设置‘’会在编译时会报错,必须改成' '中间加个空格。ps:虽然看起来很强大但有时候省略后缀真不知道加载是啥啊~);
		extensions: [' ','.css','.less','.js','.json','.vue'],
		//查找module的话从这里开始查找;
		modules: [path.resolve(__dirname, "src"), "node_modules"], //绝对路径;
		//别名设置,主要是为了配和webpack.ProvidePlugin设置全局插件;
		alias: {
			"components":path.resolve(__dirname,'../src/components'),
			"assets":path.resolve(__dirname,'../src/assets'),
			"lib":path.resolve(__dirname,'../src/lib'),			
		}
	}
};
/*
 * npm install babel-core babel-loader babel-preset-es2015 --save-dev //es6语法插件
npm install cssnano extract-text-webpack-plugin optimize-css-assets-webpack-plugin --save-dev //样式提取压缩
npm install style-loader css-loader less-loader less postcss-loader autoprefixer --save-dev //样式模块加载器(自动添加前缀)
npm install url-loader img-loader file-loader //图片字体文件加载器
npm install html-webpack-plugin webpack webpack-dev-server --save-dev//webpack打包框架
*/