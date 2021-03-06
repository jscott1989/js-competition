/**
 * Copyright (C) 2012 Jonathan Scott
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions: The above copyright
 * notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * This contains functionality relating to the code editor
 * currently it uses CodeMirror
 */

// Record sample code passed from config
var sampleCode = $('#code').text();

var codeMirror = CodeMirror.fromTextArea($('#code')[0], {"lineNumbers": true, "onChange": function codeChanged(change) {
	v.code(change.getValue());
}});

if (localStorage && 'code' in localStorage) {
	v.code = ko.observable(localStorage['code'])
} else {
	v.code = ko.observable(sampleCode);
}
codeMirror.setValue(v.code());

// Record the changes into localstorage
v.code.subscribe(function(newValue) {
	if (localStorage) {
		localStorage['code'] = newValue;
	}
	if (codeMirror.getValue() != newValue) {
		// Manually bind codeMirror
		codeMirror.setValue(newValue)
	}
});

