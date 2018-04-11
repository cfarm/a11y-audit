var listRulesNOTinAudit = [];

var axeRules = [
    {
        axeName: 'aria-roles',
        auditChecklistItems: ['A1']
    },
    {
        axeName: 'aria-valid-attr',
        auditChecklistItems: ['A1']
    },
    {
        axeName: 'aria-valid-attr-value',
        auditChecklistItems: ['A1']
    },
    {
        axeName: 'audio-caption',
        auditChecklistItems: ['B2', 'B6']
    },
    {
        axeName: 'button-name',
        auditChecklistItems: ['A6']
    },
    {
        axeName: 'bypass',
        auditChecklistItems: ['A12', 'B5', 'C4']
    },
    {
        axeName: 'color-contrast',
        auditChecklistItems: ['A15', 'E1']
    },
    {
        axeName: 'document-title',
        auaxeNameditChecklistItems: ['A4']
    },
    {
        axeName: 'frame-title',
        auditChecklistItems: ['E9']
    },
    // {
    //     axeName: 'heading-order',
    //     auditChecklistItems: ['A14'] // doesn't report accurately
    // },
    {
        axeName: 'html-has-lang',
        auditChecklistItems: ['A5']
    },
    {
        axeName: 'html-lang-valid',
        auditChecklistItems: ['A1', 'A5']
    },
    {
        axeName: 'image-alt',
        auditChecklistItems: ['A10','B2','B6']
    },
    {
        axeName: 'label',
        auditChecklistItems: ['A2']
    },
    {
        axeName: 'link-in-text-block',
        auditChecklistItems: ['E2']
    },
    {
        axeName: 'meta-viewport',
        auditChecklistItems: ['D3']
    },
    {
        axeName: 'meta-viewport-large',
        auditChecklistItems: ['D3']
    },
    {
        axeName: 'object-alt',
        auditChecklistItems: ['B2','B6']
    },
    // {
    //     axeName: 'page-has-heading-one',
    //     auditChecklistItems: ['A7'] // doesn't report accurately
    // },
    // {
    //     axeName: 'skip-link',
    //     auditChecklistItems: ['A12', 'B5'] // doesn't report accurately
    // },
    {
        axeName: 'valid-lang',
        auditChecklistItems: ['A1']
    },
    {
        axeName: 'video-caption',
        auditChecklistItems: ['B2', 'B6']
    },
    {
        axeName: 'video-description',
        auditChecklistItems: ['B2', 'B6']
    },
]

var listRulesInAudit = ['aria-roles',
'aria-valid-attr',
'aria-valid-attr-value',
'audio-caption',
'button-name',
'bypass',
'color-contrast',
'document-title',
'frame-title',
'heading-order',   
'html-has-lang',
'html-lang-valid',
'image-alt',
'label',
'link-in-text-block',
'meta-viewport',
'meta-viewport-large',
'object-alt',
'page-has-heading-one',
'skip-link',
'valid-lang',
'video-caption',
'video-description'];

var elRulesInAudit = document.getElementById('rules-in-audit');
var elRulesNOTinAudit = document.getElementById('rules-NOT-in-audit');
var elAllRules = document.querySelectorAll('#all-rules li');

function addToPage(rulesList, el) {
    for (var i = 0; i < rulesList.length; i++) {
        el.innerHTML += '<li>' + rulesList[i] + '</li>';
    }
}

// addToPage(listRulesInAudit, elRulesInAudit);

function getAllRules(els) {
    var rulesList = [];
    for (var i = 0; i < els.length; i++) {
        var ruleLink = els[i].innerHTML;
        // var slug = ruleLink.replace(/https:\/\/dequeuniversity.com\/rules\/axe\/2.6\//, '');
        rulesList.push(ruleLink);
    }
    console.log(rulesList);
    return rulesList;
}

function filterList(originalList, filterOutList) {
    var result = {};

    const notInList = value =>
      !filterOutList.some(element => value.includes(element));

    const inList = value =>
      filterOutList.some(element => value.includes(element));

    result.notInList = originalList.filter(notInList);
    result.inList = originalList.filter(inList);

    console.log(result);
    return result;
    
}

function filterRules() {

    var listAllRules = getAllRules(elAllRules);
    var listRulesNOTinAudit = filterList(listAllRules, listRulesInAudit).notInList;
    var linksInAudit = filterList(listAllRules, listRulesInAudit).inList;

    for (var i = 0; i < listRulesNOTinAudit.length; i++) {
        elRulesNOTinAudit.innerHTML += '<li>' + listRulesNOTinAudit[i] + '</li>';
    }

    for (var i = 0; i < linksInAudit.length; i++) {
        elRulesInAudit.innerHTML += '<li>' + linksInAudit[i] + '</li>';
    }

}

filterRules();
