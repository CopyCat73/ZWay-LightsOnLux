/*** LightsOnLux Z-Way module *******************************************

Version: 1.00
(c) CopyCatz, 2015
-----------------------------------------------------------------------------
Author: CopyCatz <copycat73@outlook.com>
Description: Light switching based on lux levels

******************************************************************************/

function LightsOnLux (id, controller) {
    // Call superconstructor first (AutomationModule)
    LightsOnLux.super_.call(this, id, controller);
    
    this.canSwitchOn = undefined;
    this.canSwitchOff = undefined;

}

inherits(LightsOnLux, AutomationModule);

_module = LightsOnLux;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

LightsOnLux.prototype.init = function (config) {
    LightsOnLux.super_.prototype.init.call(this, config);

    var self = this;
    self.canSwitchOn = true
    self.canSwitchOff = true;

    this.handleLuxUpdates = function (sDev) {

        var that = self;
        var value = sDev.get("metrics:level");
        
        if (value <= that.config.lux_level_on && that.canSwitchOn) {
            console.log("[LightsOnLux] switching on lights");
            _.each(that.config.onofflights,function(element) {
                var vDev = that.controller.devices.get(element.device);
                if (vDev) {
                    vDev.performCommand("on");
                }
            });
            _.each(that.config.dimmers,function(element) {
                var vDev = that.controller.devices.get(element.device);
                if (vDev) {
                    vDev.performCommand('exact',{ level: el.level });
                }
            });
            self.canSwitchOn = false;
            self.canSwitchOff = true;
        }
        else if (value >= that.config.lux_level_off && that.canSwitchOff) {
            console.log("[LightsOnLux] switching off lights");
            _.each(that.config.onofflights,function(element) {
                var vDev = that.controller.devices.get(element.device);
                if (vDev) {
                    vDev.performCommand("off");
                }
            });
            _.each(that.config.dimmers,function(element) {
                var vDev = that.controller.devices.get(element.device);
                if (vDev) {
                    vDev.performCommand("off");
                }
            });
            self.canSwitchOn = true;
            self.canSwitchOff = false;            
        }
    };
    
    // Setup event listener
    self.controller.devices.on(this.config.luxsensor, 'change:metrics:level', self.handleLuxUpdates);        
};
    


LightsOnLux.prototype.stop = function () {
    
    var self = this;
    
    // Remove event listeners
    self.controller.devices.off(this.config.luxsensor, 'change:metrics:level', self.handleLuxUpdates);  
       
    LightsOnLux.super_.prototype.stop.call(this);
 
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------
