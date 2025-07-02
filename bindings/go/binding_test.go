package tree_sitter_qmake_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_qmake "github.com/tingerrr/tree-sitter-qmake/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_qmake.Language())
	if language == nil {
		t.Errorf("Error loading Qmake grammar")
	}
}
