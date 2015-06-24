class ElixirParser extends $Builtin

    init:->
        @startRun(2000);

    run:->
        dictionary =
        {
            "module":     { pattern: "keyword.control.module.elixir:defmodule", start: "keyword.control.elixir:do", end: "keyword.control.elixir:end" },
            "method":    { pattern: "keyword.control.elixir:def", start: "keyword.control.elixir:do", end: "keyword.control.elixir:end" },
            "function":  { pattern: "keyword.control.elixir:defp", start: "keyword.control.elixir:do", end: "keyword.control.elixir:end" }
        }

        pp.utils.parseSymbolTable(dictionary,["meta.module.elixir"]); # Do not exclude text, we need it.
