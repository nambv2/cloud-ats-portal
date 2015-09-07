var requirejsCompileSkip = require('./tasks/requirejs-compile-skip.json');

var pkg = require('./package.json');

var pub = pkg.cloudats.public;
var tmp = pkg.cloudats.temp;
var bld = pkg.cloudats.build;

module.exports = function (grunt) {


    // Project configuration.
    grunt.initConfig({

        turnOffPotatoDeclaration: {
            tmp: {
                expand: true,
                src: [
                    tmp + '*/**/*.js',
                    tmp + 'app.js'
                ]
            }
        },
        ngAnnotate: {
            tmp: {
                expand: true,
                src: [
                    tmp + '*/**/*.js',
                    tmp + 'app.js'
                ],
                ext: '.js', // Dest filepaths will have this extension.
                extDot: 'last'
            }
        },
        turnOnPotatoDeclaration: {
            tmp: {
                expand: true,
                src: [
                    tmp + '*/**/*.js',
                    tmp + 'app.js'
                ]
            }
        },
        adjustTemplateUrls: {
            tmp: {
                options: {
                    from: 'app',
                    to: 'build'
                },
                expand: true,
                src: [
                    tmp + '*/**/*.*',
                    tmp + 'app.js'
                ]
            }
        },
        html2js: {
            options: {
                base: tmp,
                module: 'smart-templates',
                singleModule: true,
                rename: function (moduleName) {
                    return 'build/' + moduleName;
                }
            },
            main: {
                src: [tmp + '**/*.tpl.html'],
                dest: tmp + 'smart-templates.js'
            }
        },
        addIncludes:{
            options:{
                appFile: tmp + 'app.js',
                includesFile: tmp + 'includes.js'
            },
            templates:{
                options:{
                    angularModule: true,
                    wrapToDefine: true,
                    name: 'smart-templates',
                    injectToApp: true
                },
                src: [
                    tmp + 'smart-templates.js'
                ]

            }

        },
        uglify: {
            tmp: {
                expand: true,
                cwd: tmp,
                src: [
                    '**/*.js'
                ],
                dest: tmp,
                ext: '.js'
            }
        },

        clean: {
            pre: {
                options: {
                    force: true
                },
                src: [
                    bld,
                    tmp
                ]
            },
            post: {
                options: {
                    force: true
                },
                src: [
                    tmp
                ]
            }
        },
        copy: {
            pre: {
                expand: true,
                cwd: pub + 'app/',
                src: [
                    '**'
                ],
                dest: tmp
            },
            post: {
                expand: true,
                cwd: tmp,
                src: [
                    '*/**',
                    'rconfig.min.js',
                    '!**/*.tpl.html'
                ],
                dest: bld
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: tmp,
                    paths: requirejsCompileSkip,
                    mainConfigFile: tmp + 'rconfig.min.js',
                    name: "main",
                    optimize: 'none',
                    uglify2: {
                        mangle: false
                    },
                    out: bld + 'main.js',
                    done: function (done, output) {
                        console.log('done requirejs');
                        done();
                    }
                }
            }
        },
		cssmin: {
		  target: {
			files: [{
			  expand: true,
			  cwd: pub + 'styles/css',
			  src: ['tealtheme.css'],
			  dest: pub + 'styles/css',
			  ext: '.min.css'
			}]
		  }
		},
		'string-replace': {
		  dist: {
			files: {
			  'dest/': pub + 'index.html'
			  
			},
			options: {
			  replacements: [{
				pattern: 'app',
				replacement: 'build'
			  }]
			}
		  }
		}
    });
	
	
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.loadNpmTasks('grunt-html2js');
	
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	grunt.loadNpmTasks('grunt-string-replace');

    grunt.loadTasks('tasks');


    grunt.registerTask('default', [
        'clean:pre',
        'copy:pre',
        'turnOffPotatoDeclaration',
        'ngAnnotate:tmp',
        'turnOnPotatoDeclaration',
        'adjustTemplateUrls',
        'html2js',
		'cssmin',
		'string-replace',
        'addIncludes',
        'uglify',
        'requirejs',
        'copy:post',
        'clean:post'
    ]);

    grunt.registerTask('vtp', [
        'vendor-to-plugin',
        'default'
    ]);



};