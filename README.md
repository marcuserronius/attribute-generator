# attribute-generator
_Generate attributes for document elements_

## Purpose
This software was created to enable dynamic creation of attributes for elements in documents. Originally conceived as a way to generate path data for an SVG file, the concept was extended to generating a value for any attribute.

## Usage
*Include the script and namespace declaration:*
    <svg xmlns:gen="http://github.com/marcuserronius/attribute-generator">
    <script href="http://github.com/marcuserronius/attribute-generator/ag.js" />
*Place your javascript code in the gen:_whatever_ attribute:*
    <path gen:d="[_.d.M(0,0),_.d.L(10,10)]"/>
*Generated data is placed in the _whatever_ attribute:*
    <path d="M0,0L10,10"/>

There are also useful helper functions defined to help with tasks like iterating over ranges of values and using data from the query string.

## Current Status
Currently, only range iteration and a few path data functions are implemented.
