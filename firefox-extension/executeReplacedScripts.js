var scriptAry = [].slice.call(document.getElementsByTagName('script')); scriptAry.forEach(function(item){const src=item.src;  var script=document.createElement('script'); script.src=src;   document.body.insertBefore(script, item); item.parentNode.removeChild(item);});