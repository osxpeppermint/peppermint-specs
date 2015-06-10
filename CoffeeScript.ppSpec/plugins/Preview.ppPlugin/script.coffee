

class CoffeescriptPreview extends $Plugin

    run:->
        $Preview.loadDocument("CoffeeScript ❯ Preview", pp.utils.coffee($Document.info().content), "JavaScript");
        
