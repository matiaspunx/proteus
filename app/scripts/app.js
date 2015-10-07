/* jshint ignore:start */
(function(document) {
    'use strict';

    // Grab a reference to our auto-binding template
    // and give it some initial binding values
    // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
    var app = document.querySelector('#app');

    app.displayInstalledToast = function() {
        document.querySelector('#caching-complete').show();
    };

    // Listen for template bound event to know when bindings
    // have resolved and content has been stamped to the page
    app.addEventListener('dom-change', function() {
        console && console.log('%cHey, amigos!\n%cEsto es GDG DevFest 2015 Buenos aires!',
                       'font-size:1.5em;color:#4558c9;', 'color:#d61a7f;font-size:1em;');
    });

    // See https://github.com/Polymer/polymer/issues/1381
    window.addEventListener('WebComponentsReady', function() {
        // imports are loaded and elements have been registered
    });

    // Close drawer after menu item is selected if drawerPanel is narrow
    app.onMenuSelect = function() {
        var drawerPanel = document.querySelector('#paperDrawerPanel');
        if (drawerPanel.narrow) {
            drawerPanel.closeDrawer();
        }
    };
    /* jshint ignore:start */
    app.findByPropertyValue = function(array, property, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][property] == value) {
                return array[i];
            }
        }
    };

    // Scroll page to top and expand header
    app.scrollPageToTop = function() {
      var item = document.getElementById('mainContainer');
      console.log(item);
      app.smoothScroll(item, 1000);
    };

    app.scrollToTop = function() {
        var heros = document.querySelectorAll('#hero');
        for (var i = heros.length - 1; i >= 0; i--) {
            app.smoothScroll(heros[i], 1000);
        }
    };

    app.scrollPageToSpeakers = function() {
      var item = document.getElementById('scrollPersonas');
      app.smoothScroll(item, 1000);
    };

    app.generateClass = function(value) {
        return value.replace(/\s+/g, '-').toLowerCase();
    };

    app.smoothScroll = function(el, optDuration, optCallback) {
        var duration = optDuration || 1;

        var scrollContainer = document.querySelector('paper-drawer-panel [main]');

        var startTime = window.performance.now();
        var endTime = startTime + duration;
        var startTop = scrollContainer.scrollTop;
        var destY = el.getBoundingClientRect().top;

        if (destY === 0) {
            if (optCallback) {
                optCallback();
            }
            return; // already at top of element.
        }

        var callback = function(timestamp) {
            if (timestamp < endTime) {
                requestAnimationFrame(callback);
            }

            var point = smoothStep(startTime, endTime, timestamp);
            var scrollTop = Math.round(startTop + (destY * point));

            scrollContainer.scrollTop = scrollTop;

            if (point === 1 && optCallback) {
                optCallback();
            }
        };
        callback(startTime);
    };

    function smoothStep(start, end, point) {
        if (point <= start) {
            return 0;
        }
        if (point >= end) {
            return 1;
        }
        var x = (point - start) / (end - start);
        return x * x * (3 - 2 * x);
    }

})(document);
/* jshint ignore:end */