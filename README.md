# ProcessWire AjaxSearch

This module progressively enhances the search form to an ajax live search. It will perform a search like you would use the form normally, and returns the output of the search page. So the search will still work without js enabled.
There's some basic styling attached to this module in the "styling-example". You can use it to get started. See readme in there.

Added in 1.1.2

* added support to turn off automatic script injection. See Module Setting section for further information.

Added in 1.1.0

* added key support for browsing results with arrow down and up.
* added escape key to close results.
* added close results on click outside


## Setup the search.php

So it works almost out of the box with the basic install profile of ProcessWire, you only need make a minor change to the search.php template file to only return the content part (results) on a ajax request.

To get the ajax search only return the content, open search.php and change the output on the bottom to this:

```
if(!$config->ajax) include("./head.inc");
echo $out;
if(!$config->ajax) include("./foot.inc");
```


## Module Settings

It comes with some module options to define various settings regarding the search form.

as_minLength = 3 // min length for starting ajax request
as_close_text = 'close' // close button text
as_search_form = #search_form // if you have a different search form id,class
as_search_input = #search_query // if you have a different search input id,class
as_query_name = 'q' // this is the default param name
as_query_url = '' // if left blank the script will take the action of the form
add_script = true // automatic script injection before closing body. You can turn this off and add the script manually

add_script: If you turn this off, you'll need to output the config vars used by AjaxSearch.js before the script include like: ```<?php echo "<script>var as_config =" . json_encode($modules->AjaxSearch->data) . "<script>"?>```


## How to install:

- Download the contents of this repository and put the folder into your site/modules/ folder
- Login to processwire and got to Modules page and click "Check for new modules". You should see a note that AjaxSearch module wes found. Install the module.

