var rulesInAudit = {
    'aria-allowed-attr': { auditItemNumber: ['A1'] },
    'aria-roles': { auditItemNumber: ['A1'] },
    'aria-valid-attr': { auditItemNumber: ['A1'] },
    'aria-valid-attr-value': { auditItemNumber: ['A1'] },
    'audio-caption': { auditItemNumber: ['B2', 'B6'] },
    'button-name': { auditItemNumber: ['A6'] },
    'bypass': { auditItemNumber: ['A12', 'B5', 'C4'] },
    'color-contrast': { auditItemNumber: ['A15', 'E1'] },
    'document-title': { auditItemNumber: ['A4'] },
    'duplicate-id': { auditItemNumber: ['A1'] },
    'frame-title': { auditItemNumber: ['E9'] },
    // 'heading-order': { auditItemNumber: ['A14'] }, // doesn't report accurately
    'html-has-lang': { auditItemNumber: ['A5'] },
    'html-lang-valid': { auditItemNumber: ['A1', 'A5'] },
    'image-alt': { auditItemNumber: ['A10','B2','B6'] },
    'label': { auditItemNumber: ['A2'] },
    'link-in-text-block': { auditItemNumber: ['E2'] },
    'meta-viewport': { auditItemNumber: ['D3'] },
    'meta-viewport-large': { auditItemNumber: ['D3'] },
    'object-alt': { auditItemNumber: ['B2','B6'] },
    // 'page-has-heading-one': { auditItemNumber: ['A7'] }, // doesn't report accurately
    // 'skip-link': { auditItemNumber: ['A12', 'B5'] }, // doesn't report accurately
    'valid-lang': { auditItemNumber: ['A1'] },
    'video-caption': { auditItemNumber: ['B2', 'B6'] },
    'video-description': { auditItemNumber: ['B2', 'B6'] }
};

var elRulesInAudit = document.getElementById('rules-in-audit');
var elRulesNOTinAudit = document.getElementById('rules-NOT-in-audit');
var elAllRules = document.querySelectorAll('#all-rules li');

function getAllRules(els) {
    var rulesList = [];
    for (var i = 0; i < els.length; i++) {
        var ruleLink = els[i].innerHTML;
        rulesList.push(ruleLink);
    }
    return rulesList;
}

function filterList(originalList, filterOutObj) {
    var result = {};

    var filterOutList = Object.keys(filterOutObj);

    result.inAudit = originalList.filter( function( link ) {
        var rulesInList = null;
        
        rulesInList = filterOutList.some( function (element, index, array) {
            
            // match element preceded by 2.6 in url with a quote at the end
            if ( link.includes( '2.6/' + element + '"', index ) ) {
                var rule = filterOutObj[array[index]];
                rule.href = link;
            }

            return link.includes( '2.6/' + element + '"' );
        } );

        return rulesInList; 
    } );

    const notInAudit = value =>
        !result.inAudit.some(element => value.includes(element));

    result.notInAudit = originalList.filter(notInAudit);

    console.log( result );
    return result;
    
}

function formatAuditItemNumber(itemList) {
    var auditText = '';
    itemList.map( function( value, index ) {
        if ( itemList.length > 2 && index === itemList.length - 1 || itemList.length === 2 && index === 1 ) {
            auditText += 'and  ' + value + '.';            
        } else if ( itemList.length === 2 && index === 0) {
            auditText += value + ' ';            
        } else if (itemList.length === 1) {
            auditText += value + '.';            
        }
        else {
            auditText += value + ', ';            
        }
    } );
    return auditText;
}

function filterRules( ) {
    var listAllRules = getAllRules( elAllRules );
    var filteredRulesList = filterList( listAllRules, rulesInAudit );
    var listRulesNOTinAudit = filteredRulesList.notInAudit;
    var linksInAudit = filteredRulesList.inAudit;

    for (var i = 0; i < listRulesNOTinAudit.length; i++) {
        elRulesNOTinAudit.innerHTML += '<li>' + listRulesNOTinAudit[i] + '</li>';
    }

    var rulesInAuditList = Object.keys( rulesInAudit );

    for (var i = 0; i < rulesInAuditList.length; i++) {
        var ruleSlug = rulesInAuditList[i];
        var rule = rulesInAudit[ruleSlug];

        elRulesInAudit.innerHTML += '<li>Violation of "' + ruleSlug + '" rule: ' + rule.href + ' is a <strong>failure for ' + formatAuditItemNumber(rule.auditItemNumber) + ' </strong></li>';
    }

}

filterRules();
