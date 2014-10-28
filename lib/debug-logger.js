/**
 * debug-logger
 *
 * @file Manages all debug and log.
 * @author chentsulin
 *
 */

;(function(console) {
    'use strict';



    /**
     * A wrapped console for debug usage
     * @module services/debug-logger
     */

    var config = require('./loggerfile');

    /**
     * A constant api hook setting.
     * @readonly
     * @const {string}
     */
    var apiHook = config.debugApiHook || null;

    /**
     * @todo api hook
     * @todo white list
     * @todo black list
     */

    /**
     * More powerful debug logger constructor.
     * @class
     * @classdesc More powerful debug logger
     * @param namespace
     */
    var debugLogger = function(namespace) {

        /**
         * @instance
         */
        this.namespace = namespace;

        /**
         *
         * @public
         * @property {boolean}
         */
        this.enabled = (config.debug === 'undefined') ? true : config.debug;

        /**
         *
         * @public
         * @property {number}
         */
        this.level = (config.debugLevel === 'undefined') ? 4 : config.debugLevel;
    };

    /**
     * @const {string}
     * @default
     */
    var ERROR_COLOR = 'background: #FF202B; color: #fff';

    /**
     * @const {string}
     * @default
     */
    var  WARN_COLOR = 'color: #FF202B';

    /**
     * @const {string}
     * @default
     */
    var  INFO_COLOR = 'color: #423EFF';

    /**
     * @const {string}
     * @default
     */
    var   LOG_COLOR = 'color: #111';

    debugLogger.prototype.errorColor = ERROR_COLOR;
    debugLogger.prototype.warnColor  =  WARN_COLOR;
    debugLogger.prototype.infoColor  =  INFO_COLOR;
    debugLogger.prototype.logColor   =   LOG_COLOR;

    /**
     * @public
     * @return {string}
     */
    debugLogger.prototype.format = function(str) {
        return '%c' + new Date().toLocaleString() + ' ' +
            this.getLine() + '\n-> ' + this.namespace + ' - ' + str;
    };

    /**
     * Get original function caller filepath and line descriptions
     * @public
     * @return {string}
     */
    debugLogger.prototype.getLine = function() {

        var caller_line = (new Error).stack.split('\n')[4];
        var index = caller_line.indexOf('at ');
        return caller_line.slice(index + 2, caller_line.length);
    };

    /**
     * Enable debug logger at the runtime.
     *
     * @public
     * @method enable
     */
    debugLogger.prototype.enable = function() {
        this.enabled = true;
    };

    /**
     * Disable debug logger at the runtime.
     *
     * @public
     * @method disable
     */
    debugLogger.prototype.disable = function() {
        this.enabled = false;
    };

    /**
     * Get debug level.
     *
     * @public
     * @method getDebugLevel
     * @return {number} debug level
     */
    debugLogger.prototype.getDebugLevel = function() {
        return this.level;
    };

    /**
     * Set specific debug level for showing console messages at the runtime.
     *
     * @public
     * @method setDebugLevel
     */
    debugLogger.prototype.setDebugLevel = function(dl) {
        this.level = dl;
    };

    // level 0
    // Do not show any message on console

    // level 1
    /**
     *
     *
     * @public
     * @method error
     * @param {str|Object} arg
     */
    debugLogger.prototype.error = function(arg) {

        if (this.enabled && this.level >= 1) {
            if (typeof arg === 'string' && arguments.length == 1) {
                console.error(this.format(arg), this.errorColor);
            } else {
                console.error.apply(console, arguments);
            }
        }
    };

    // level 2
    /**
     *
     *
     * @public
     * @method error
     * @param {str|Object} arg
     */
    debugLogger.prototype.warn = function(arg) {

        if (this.enabled && this.level >= 2) {
            if (typeof arg === 'string' && arguments.length == 1) {
                console.warn(this.format(arg), this.warnColor);
            } else {
                console.warn.apply(console, arguments);
            }
        }
    };


    // level 3
    /**
     *
     *
     * @public
     * @method error
     * @param {str|Object} arg
     */
    debugLogger.prototype.info = function(arg) {

        if (this.enabled && this.level >= 3) {
            if (typeof arg === 'string' && arguments.length == 1) {
                console.info(this.format(arg), this.infoColor);
            } else {
                console.info.apply(console, arguments);
            }
        }
    };

    // level 4
    /**
     *
     *
     * @public
     * @method error
     * @param {str|Object} arg
     */
    debugLogger.prototype.log = function(arg) {

        if (this.enabled && this.level >= 4) {
            if (typeof arg === 'string' && arguments.length == 1) {
                console.log(this.format(arg), this.logColor);
            } else {
                console.log.apply(console, arguments);
            }
        }
    };


    module.exports = function(namespace) {

        return new debugLogger(namespace);
    };


}(console));