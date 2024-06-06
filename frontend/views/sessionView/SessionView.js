/**
* SessionView.js
*
* @author Edwin Cotto <edtowers1037@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-February-03 initial version
*/

import { addClasses, appendChildren, createElementContainer, createHeadingText, sortArrayOfObj } from "../../../helpers/basicElements.js";

export class SessionView { 
    constructor(parentProps){
        this.parentProps = parentProps;
        this.view = addClasses(createElementContainer(), 'sessionView_view');
        this.setView();
    }
    setView(){
        appendChildren(this.view, [
            createHeadingText('session is working.')
        ])
    }
}
