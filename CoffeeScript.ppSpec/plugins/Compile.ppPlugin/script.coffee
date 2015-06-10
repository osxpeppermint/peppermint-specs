
class CoffeescriptCompile extends $Plugin

    run:->
        $Document.write("#{ $Document.info().path }.js", pp.utils.coffee($Document.info().content) );
