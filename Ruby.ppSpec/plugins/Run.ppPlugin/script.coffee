
class RubyRun extends $Plugin
    
    run:->
        $Terminal.exec("ruby", "-r", "#{ @path }/async.rb", $Document.info().path);


