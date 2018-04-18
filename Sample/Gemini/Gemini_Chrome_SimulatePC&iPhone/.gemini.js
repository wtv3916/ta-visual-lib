module.exports = {
    rootUrl: 'http://detectmobilebrowsers.com/',
    gridUrl: 'http://127.0.0.1:6666',
    sessionRequestTimeout: 120000,
    tolerance: 3.6,
    compositeImage: true,
    sessionsPerBrowser: 4,
    retry: 3,
    screenshotMode: 'viewport',
    sessionRequestTimeout: 120000,
	httpTimeout: 60000,
	sessionQuitTimeout: 30000,

    browsers: {
        iPhone6_6s_7_8: {
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                	args: ['--ignore-certificate-errors', '--disable-gpu'],
//                	args: ['--ignore-certificate-errors', '--disable-gpu', '--proxy-server=172.17.0.1:3128'],
                	mobileEmulation: {
                		userAgent: 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19',
                		deviceMetrics: {
                            width: 375,
                            height: 667,
                            // Disable the scroll bar
                            mobile: false,
                            touch: false,
                        },
                	},
                },
            },
        },
        PC: {
            windowSize: '1920x1080',
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                	args: ['--ignore-certificate-errors', '--disable-gpu'],
//                	args: ['--ignore-certificate-errors', '--disable-gpu', '--proxy-server=172.17.0.1:3128'],
                },
            },
        },
    },

    system: {
    	plugins: {
    		'html-reporter/gemini': {
    			enabled: true,
    			path: 'gemini-report',
    		},
    	},
    	debug: false,
    },

};