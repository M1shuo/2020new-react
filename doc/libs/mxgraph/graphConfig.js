var urlParams = (function(url)
{
	var result = new Object();
	var idx = url.lastIndexOf('?');

	if (idx > 0)
	{
		var params = url.substring(idx + 1).split('&');
		
		for (var i = 0; i < params.length; i++)
		{
			idx = params[i].indexOf('=');
			
			if (idx > 0)
			{
				result[params[i].substring(0, idx)] = params[i].substring(idx + 1);
			}
		}
	}
	
	return result;
})(window.location.href);

mxLoadResources = false;

window.MAX_REQUEST_SIZE = 10485760;
window.MAX_AREA = 15000 * 15000;

window.EXPORT_URL = '';
window.SAVE_URL = '';
window.OPEN_URL = '';
window.RESOURCES_PATH = '';
window.RESOURCE_BASE = '';
window.STENCIL_PATH = 'libs/mxgraph/stencils';
window.IMAGE_PATH = 'libs/mxgraph/images';
window.STYLE_PATH = 'libs/mxgraph/styles';
window.CSS_PATH = 'libs/mxgraph/src/css';
window.OPEN_FORM = '';
window.mxBasePath = 'libs/mxgraph/src';