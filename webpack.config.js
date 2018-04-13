var path = require("path")
var webpack = require("webpack");


module.exports = {
    entry: {
        main: [
            path.join(__dirname, 'src/js', 'main.js')
        ]
    },
    output: {
        path: path.join(__dirname, '/js/'),
        filename: '[name].js',
        publicPath: '/js/'
    },
    //watch: true,
    module: {
        loaders: [
            {    
                test: /\.js/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets:[ 'es2015', 'stage-2' ]
                }
            },
            { test: 'jquery', loader: 'expose?jQuery!expose?$' },
        ]
    },
   resolve: {
        modulesDirectories: [
            'node_modules',
            'bower_components',
            'bower_components/wow/dist',
            'bower_components/slick-carousel/slick',
            'bower_components/parallax/deploy',
            'src/blocks',
            'src/libs/modal',
            'src/libs/tablist',
            'src/libs/awesomplete',
            'src/js',
            'src/js/plugins',
        ],
        alias: {
            "TweenLite": path.resolve('bower_components', 'gsap/src/uncompressed/TweenLite.js'),
            "TweenMax": path.resolve('bower_components', 'gsap/src/uncompressed/TweenMax.js'),
            "TimelineLite": path.resolve('bower_components', 'gsap/src/uncompressed/TimelineLite.js'),
            "TimelineMax": path.resolve('bower_components', 'gsap/src/uncompressed/TimelineMax.js'),
            "ScrollMagic": path.resolve('bower_components', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
            "animation.gsap": path.resolve('bower_components', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
            "debug.addIndicators": path.resolve('bower_components', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
            "slick": path.resolve('bower_components', 'slick-carousel/slick/slick.js'),
            "enquire": path.resolve('bower_components', 'enquire/dist/enquire.js'),
        },
    },
    

}