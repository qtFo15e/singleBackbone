/**
 * Created by 迟猛 on 2017/11/8.
 */
//依赖backbone.js
define( [ "jquery", 'underscore', "rowbackbone" ], function ($, _, Backbone) {
    // 规范el的使用 el的意义为组件的挂载点
    // 移除组件时，移除组件，即挂载点内部的元素
    Backbone.View.prototype._removeElement = function() {
        this.$el.empty();
        this.$el.off();
    }
    //重命名原有extend方法，解决extend方法循环调用自身的问题
    Backbone.View._extend = Backbone.View.extend
    //全系统view对象的存储位置
    var viewMap = {}
    //覆写extend的方法，在同一挂载点下绑定多个view对象时，会自动清除前一个view对象
    Backbone.View.extend = function ( params ) {
        //返回包装后的构造函数
        return function ( args ) {
            //生成原有构造函数
            var View = Backbone.View._extend( params )
            //view对象
            var view
            // 兼容定义构函数时和实例化对象时传el
            var $el = $( _.result(args, 'el') || _.result(params, 'el')  )
            //  获取先前view对象
            var lastView =  viewMap[ $el.data( "viewID" ) ]

            // hack方法主要解决  实例化时传多个参数，但构造函数不能使用apply方法的问题
            var a = arguments[0]
            var b = arguments[1]
            var c = arguments[2]
            var d = arguments[3]
            var e = arguments[4]
            var f = arguments[5]
            var g = arguments[6]
            var h = arguments[7]
            var i = arguments[8]
            var j = arguments[9]

            //  规则：不存在则insert，存在则update
           if ( lastView !== undefined ) {
                lastView.remove()
                view = viewMap[ $el.data( "viewID" ) ] = new View( a,b,c,d,e,f,g,h,i,j )
            } else {
                var Id = _.uniqueId()
                $el.data( "viewID", Id )
                view = viewMap [ Id ] = new View( a,b,c,d,e,f,g,h,i,j )
            }

            return view
        }
    }
    return Backbone
} )
