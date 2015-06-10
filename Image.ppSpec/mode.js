define('ace/mode/image', function(require, exports, module) {

var oop = require("ace/lib/oop");
var TextMode = require("ace/mode/text").Mode;
var Tokenizer = require("ace/tokenizer").Tokenizer;
var ExampleHighlightRules = require("ace/mode/image_highlight_rules").ExampleHighlightRules;

var Mode = function() {
    this.$tokenizer = new Tokenizer(new ExampleHighlightRules().getRules());
};
oop.inherits(Mode, TextMode);

(function() {
    // Extra logic goes here. (see below)
}).call(Mode.prototype);

exports.Mode = Mode;
});

define('ace/mode/image_highlight_rules', function(require, exports, module) {

var oop = require("ace/lib/oop");
var TextHighlightRules = require("ace/mode/image_highlight_rules").TextHighlightRules;

var ExampleHighlightRules = function() {

    this.$rules = new TextHighlightRules().getRules();

}

oop.inherits(ExampleHighlightRules, TextHighlightRules);

exports.ExampleHighlightRules = ExampleHighlightRules;
});