ngapp.service('pluginErrorService', function(errorResolutionFactory, errorMessageService, errorTypeFactory) {
    let service = this;

    let referenceSignatures = ['REFR', 'PGRE', 'PMIS', 'ACHR', 'PARW', 'PBAR', 'PBEA', 'PCON', 'PFLA', 'PHZD'];

    // PRIVATE HELPER FUNCTIONS
    let getErrorResolution = function(resolutions, error) {
        return resolutions.find(function(resolution) {
            if (!resolution.hasOwnProperty('available')) return true;
            try { return resolution.available(error) } catch {}
        });
    };

    let getGroupResolutions = function(group) {
        return errorResolutionFactory.errorResolutions[group.acronym];
    };

    // PUBLIC API
    this.errorAcronyms = ['ITM', 'ITPO', 'DR', 'UES', 'URR', 'UER', 'OE'];

    this.isUDR = function(error) {
        return referenceSignatures.indexOf(error.signature) > -1;
    };

    this.isNavmeshError = function(error) {
        return error.signature === 'NAVM';
    };

    this.groupErrors = function(plugin) {
        plugin.groupedErrors = errorTypeFactory.errorTypes();
        plugin.groupedErrors.forEach(function(errorGroup) {
            errorGroup.resolution = 'auto';
            errorGroup.showGroup = false;
            errorGroup.errors = plugin.errors.filter(function(error) {
                return error.group === errorGroup.group;
            });
            service.setGroupResolutions(errorGroup);
        });
    };

    this.setPluginErrors = function(plugin, errors) {
        errorMessageService.getErrorMessages(errors);
        plugin.errors = errors;
        plugin.status = `Found ${errors.length} errors'`;
        plugin.checking = false;
        plugin.checked = true;
    };

    this.getResolutions = function(error) {
        let acronym = service.errorAcronyms[error.group],
            resolutions = errorResolutionFactory.errorResolutions[acronym];
        return resolutions.filter(function(resolution) {
            if (!resolution.hasOwnProperty('available')) return true;
            return resolution.available(error);
        });
    };

    this.getGroupResolution = function(errorGroup) {
        return errorGroup.resolution === 'auto' ?
            getGroupResolutions(errorGroup)[0] :
            errorResolutionFactory.ignoreResolution;
    };

    this.setGroupResolutions = function(errorGroup) {
        let resolution = service.getGroupResolution(errorGroup);
        if (resolution.hasOwnProperty('available')) {
            let resolutions = getGroupResolutions(errorGroup);
            errorGroup.errors.forEach(function(error) {
                error.resolution = getErrorResolution(resolutions, error);
            });
        } else {
            errorGroup.errors.forEach(function(error) {
                error.resolution = resolution;
            });
        }
    };
});