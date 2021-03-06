
define([
    'dollar',
    '../helper',
    './common/scaffold',
    './common/source_scaffold',
    './common/item',
    './common/source_item'
], function($, helper, scaffold_specs, source_scaffold_specs, 
    item_specs, source_item_specs){ 

var SEL = 'ck-card[type="list"]';

var source_item_states = {
    link: 'href',
    linkTarget: function(node){
        return node.hasClass('ckd-title-link-extern') 
            && (node.attr('target') || '_blank');
    },
    isAlone: function(node){
        return node.hasClass('ckd-title-link-alone');
    },
    customClass: helper.readClass
};

function source_item_spec(source){
    source.watch('.ckd-item');
    source.state(source_item_states);
    source.component(source_item_specs);
}

function init_list(guard){
    guard.state({
        subtype: 'subtype',
        blankText: 'blank-text',
        limit: 'limit', 
        col: 'col', 
        paperStyle: 'paper-style',
        plainStyle: 'plain-style',
        plainHdStyle: 'plain-hd-style',
        customClass: 'custom-class'
    });
    guard.component(scaffold_specs);
    guard.component('item', function(guard){
        guard.watch('ck-part[type="item"]');
        guard.state({
            link: 'href',
            linkTarget: 'target',
            isAlone: 'alone-mode',
            customClass: 'custom-class'
        });
        guard.component(item_specs);
        guard.source()
            .state(source_item_states)
            .component(source_item_specs);
    });
    guard.source()
        .component(source_scaffold_specs)
        .component('item', source_item_spec);
}

function exports(guard, parent){
    guard.watch($(SEL, parent));
    init_list(guard);
}

exports.sourceItemStates = source_item_states;
exports.sourceItemSpec = source_item_spec;
exports.initList = init_list;

return exports;

});

