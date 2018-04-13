var rulesInAudit = {
    'aria-allowed-attr': { 
        auditItemNumber: ['A1', 'B7'],
        replacesManualTest: false 
    },
    'aria-required-attr': { 
        auditItemNumber: ['A1', 'B7'],
        replacesManualTest: false 
    },
    'aria-required-children': { 
        auditItemNumber: ['A1', 'B7'],
        replacesManualTest: false 
    },
    'aria-required-parent': { 
        auditItemNumber: ['A1', 'B7'],
        replacesManualTest: false 
    },
    'aria-roles': { 
        auditItemNumber: ['A1'],
        replacesManualTest: false 
    },
    'aria-valid-attr': { 
        auditItemNumber: ['A1'],
        replacesManualTest: false 
    },
    'aria-valid-attr-value': { 
        auditItemNumber: ['A1'],
        replacesManualTest: false 
    },
    'audio-caption': { 
        auditItemNumber: ['B2', 'B6'],
        replacesManualTest: false 
    },
    'button-name': { 
        auditItemNumber: ['A6'],
        replacesManualTest: false 
    },
    'bypass': { 
        auditItemNumber: ['A12', 'B5', 'C4'],
        replacesManualTest: false 
    },
    'color-contrast': { 
        auditItemNumber: ['A15', 'E1'],
        replacesManualTest: false 
    },
    'definition-list': { 
        auditItemNumber: ['A1', 'B7'],
        replacesManualTest: false 
    },
    'dlitem': { 
        auditItemNumber: ['A1', 'B7'],
        replacesManualTest: false 
    },
    'document-title': { 
        auditItemNumber: ['A4'],
        replacesManualTest: false 
    },
    'duplicate-id': { 
        auditItemNumber: ['A1'],
        replacesManualTest: false 
    },
    'frame-title': { 
        auditItemNumber: ['E9'],
        replacesManualTest: false 
    },
    // 'heading-order': { 
    // auditItemNumber: ['A14'] }, // doesn't report accurately
    // }
    'html-has-lang': { 
        auditItemNumber: ['A5'],
        replacesManualTest: false 
    },
    'html-lang-valid': { 
        auditItemNumber: ['A1', 'A5'],
        replacesManualTest: false 
    },
    'image-alt': { 
        auditItemNumber: ['A10','B2','B6'],
        replacesManualTest: false 
    },
    'input-image-alt': { 
        auditItemNumber: ['B2'],
        replacesManualTest: false 
    },
    'label': { 
        auditItemNumber: ['A2'],
        replacesManualTest: false 
    },
    'link-in-text-block': { 
        auditItemNumber: ['E2'],
        replacesManualTest: false 
    },
    'link-name': { 
        auditItemNumber: ['B1', 'C1'],
        replacesManualTest: false 
    }, 
    'list': { 
        auditItemNumber: ['A1', 'B3', 'B7'],
        replacesManualTest: false 
    }, 
    'listitem': { 
        auditItemNumber: ['A1', 'B3', 'B7'],
        replacesManualTest: false 
    },     
    'meta-viewport': { 
        auditItemNumber: ['D3'],
        replacesManualTest: false 
    },
    'meta-viewport-large': { 
        auditItemNumber: ['D3'],
        replacesManualTest: false 
    },
    'object-alt': { 
        auditItemNumber: ['B2','B6'],
        replacesManualTest: false 
    },
    // 'page-has-heading-one': { 
    // auditItemNumber: ['A7'] }, // doesn't report accurately
    'p-as-heading': { 
        auditItemNumber: ['B1', 'B3', 'B7', 'B9'],
        replacesManualTest: false 
    }, 
    // 'skip-link': { 
    // auditItemNumber: ['A12', 'B5'] }, // doesn't report accurately

    'table-fake-caption': { 
        auditItemNumber: ['B1', 'B3', 'B7'],
        replacesManualTest: false 
    }, 
    'td-has-header': { 
        auditItemNumber: ['A1', 'B1', 'B3', 'B7'],
        replacesManualTest: false 
    }, 
    'td-headers-attr': { 
        auditItemNumber: ['A1', 'B1', 'B3', 'B7'],
        replacesManualTest: false 
    }, 
    'th-has-data-cells': { 
        auditItemNumber: ['B1', 'B3', 'B7'],
        replacesManualTest: false 
    }, 
    'valid-lang': { 
        auditItemNumber: ['A1'],
        replacesManualTest: false 
    },
    'video-caption': { 
        auditItemNumber: ['B2', 'B6'],
        replacesManualTest: false 
    },
    'video-description': { 
        auditItemNumber: ['B2', 'B6'],
        replacesManualTest: false 
    }
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
