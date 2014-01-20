var Barnacle = module.exports = {
  _: null,
  result: null,
  err: null,
  modelNames: [],
  getModelNames: function(){
    if(typeof this.modelNames[0] == 'undefined'){
      return Object.keys(sails.models).map(function(element){return element.charAt(0).toUpperCase() + element.slice(1)}) 
    }else{
      return this.modelNames;
    };
  },
  modelFromName: function(modelName){
    return eval(modelName);
  },
  getAttributeNames: function(model){
    return Object.keys(model.attributes).concat(['id', 'createdAt', 'updatedAt']);
  },
  dynamicMethodForms: [['findOneBy', 'AttributeName'], ['findOneBy', 'AttributeName'], ['findOneBy', 'AttributeName', 'Like'], ['findBy', 'AttributeName'], ['findBy', 'AttributeName', 'In'], ['findBy', 'AttributeName', 'Like'], ['countBy', 'AttributeName'], ['countBy','AttributeName', 'In'], ['countBy', 'AttributeName', 'Like'], ['AttributeName', 'StartsWith'], ['AttributeName', 'Contains'], ['AttributeName', 'EndsWith']],
  defineDynamicMethodsFor: function(object){
    var that = this;
    this.dynamicMethodForms.forEach(function(methodNameArray){
      that.getAttributeNames(object).forEach(function(attribute){
        methodNameArrayWithAttribute = methodNameArray.map(function(methodNameSegment){
          if(methodNameSegment=="AttributeName"){
            return attribute.charAt(0).toUpperCase() + attribute.slice(1);
          }else{
            return methodNameSegment;
          }
        })
        var oldMethodName = methodNameArrayWithAttribute.join('');
        var newMethodName = oldMethodName + '_';
        that.defineMethod(object, oldMethodName, newMethodName);
      })
    });
  },
  basicMethods: ['find', 'findOne', 'create', 'update', 'destroy', 'count'],
  defineBasicMethodsFor: function(object){
    var that = this;
    this.basicMethods.forEach(function(methodName){
      var newMethodName = methodName + '_';
      that.defineMethod(object, methodName, newMethodName);
    });
  },
  defineBasicMethods: function() {
    var that = this;
    this.getModelNames().forEach(function(modelName, index, array){
      that.defineBasicMethodsFor(that.modelFromName(modelName));
      console.log("Basic CRUD methods defined for: " + modelName);
    });
  },
  defineDynamicMethods: function() {
    var that = this;
    this.getModelNames().forEach(function(modelName, index, array){
      that.defineDynamicMethodsFor(that.modelFromName(modelName));
      console.log("Dynamic methods defined for: " + modelName);
    });
  },
  defineMethods:function(){
    this.defineBasicMethods();
    this.defineDynamicMethods();
  },
  defineMethod: function(object, methodName, newMethodName){
    console.log("defining " + newMethodName);
    object[newMethodName] = function(arg1, arg2){this[methodName](arg1, arg2).done(function(err, message){
      if(err){
        Barnacle.result = null;
        Barnacle.err = err
        Barnacle._ = err;
        console.info(err);
      }else{
        Barnacle.err = null;
        Barnacle.result = message;
        Barnacle._ = message;
        console.info(message);
      }
    })};
  }
};
