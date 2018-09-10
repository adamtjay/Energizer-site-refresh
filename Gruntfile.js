module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: {
	        reserved: ['jQuery']
        }
      },
      my_target: {
        files: {
	        './build/js/index.min.js':[
		        './js/jquery-3.3.1.min.js',
		        './js/tether.min.js',
		        './js/bootstrap.min.js',
		        './js/modernizr-custom.js',
		        './js/jquery.touchSwipe.js',
		        './js/bsTouchSlider.js',
		        './js/scripts.js'
	        ]
        }
      }
    },
    cssmin:{
	    options:{
		    mergeIntoShorthands:false,
		    roundingPrecision: -1
	    },
	    target:{
		    files:{
			    './build/css/style.min.css': [
			    './css/bootstrap.min.css',
			    './css/style.css'
			    ]
		    }
	    }
    },
    htmlmin:{
	  dist: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
		caseSensitive: true
      },
      files: {
        'build/index.html': './index.html',
		'build/contactus.html': './contactus.html',
		'build/antibacterial.html': './antibacterial.html',
		'build/bigones.html': './bigones.html',
	    'build/faqs.html': './faqs.html',
	    'build/handsontips.html': './handsontips.html',
	    'build/sensitiveskin.html': './sensitiveskin.html',
	    'build/singles.html': './singles.html',
        'build/404.html': './404.html'
      }
    }
  }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin']);
};
