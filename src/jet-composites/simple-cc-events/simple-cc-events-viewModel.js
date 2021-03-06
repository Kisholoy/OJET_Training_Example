'use strict';
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout'], function (oj, ko, $) {

    function SimpleCCModel(context) {
        var self = this;
        
        //At the start of your viewModel constructor
        var busyContext = oj.Context.getContext(context.element).getBusyContext();
        var options = {"description": "CCA Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        //Example observable
        self.messageText = ko.observable('Hello from Example Component');
        self.properties = context.properties;

        // console.log(context.properties);
        // self.upperFirstName = context.properties.badgeName.split(' ')[0].toUpperCase();
        // Example for parsing context properties
        // if (context.properties.name) {
        //     parse the context properties here
        // }

        //Once all startup and async activities have finished, relocate if there are any async activities
        self.busyResolve();
    };

    SimpleCCModel.prototype._raiseBadgeSelection = function (sourceEvent) {
        if (sourceEvent.type === 'click' ||
            (sourceEvent.type === 'keypress' && sourceEvent.keycode === 13)){
            var eventParams = {
                'bubbles' : true,
                'cancelable' : false,
                'detail' : {
                    'nameOnBadge' : this.properties.badgeName
                }
            };
            //Raise the custom event
            this.composite.dispatchEvent(new CustomEvent('badgeSelected',
                                                          eventParams));
       }
    };
    
    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    SimpleCCModel.prototype.attached = function(context){
        var self = this;
        this.composite.addEventListener('click',function(event){
            self._raiseBadgeSelection(event);
        });
    };

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.detached = function(context){
    //};

    //ExampleComponentModel.prototype.propertyChanged = function(context){
    //};

    return SimpleCCModel;
});