import XCTest
import SwiftTreeSitter
import TreeSitterQmake

final class TreeSitterQmakeTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_qmake())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Qmake grammar")
    }
}
