
define(function(require){

var darkdom = require('darkdom'),
    convert = require('mo/template/micro').convertTpl,
    helper = require('../helper'),
    render_content = convert(require('../tpl/box/content').template),
    render_collect = convert(require('../tpl/box/collect').template),
    render_hdwrap = convert(require('../tpl/scaffold/hdwrap').template),
    render_box = convert(require('../tpl/box').template),
    scaffold_components = require('./common/scaffold');

var exports = {

    content: function(){
        return darkdom({
            enableSource: true,
            sourceAsContent: true,
            render: render_content
        });
    },

    collect: function(){
        return darkdom({
            enableSource: true,
            sourceAsContent: true,
            render: render_collect
        });
    },

    box: function(){
        var box = darkdom({
            enableSource: true,
            render: function(data){
                data.isBlank = !data.component.collect.length 
                    && helper.isBlank(data.content);
                data.hasSplitHd = data.state.plainStyle === 'true'
                    || data.state.plainHdStyle === 'true';
                data.hdwrap = render_hdwrap(data);
                return render_box(data);
            }
        });
        box.contain(scaffold_components);
        box.contain('content', exports.content, {
            content: true
        });
        box.contain('collect', exports.collect);
        return box;
    }

};

return exports;

});

