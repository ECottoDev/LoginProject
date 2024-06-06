/**
* loginView.js
*
* @author Edwin Cotto <edtowers1037@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-February-08 initial version
*/

import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createHeadingText, createInputBar, createPillBox } from "../../../helpers/basicElements.js";
import { routes } from "../../../helpers/router.js";
import { getUsers, systemLogin } from "../../databaseCallers/loginDataCalls.js";


export class LoginView {
    constructor(parentProps) {
        this.parentProps = parentProps;
        this.view = addClasses(createElementContainer(), 'loginView_view');
        this.fetch();
    }
    async fetch() {
        this.setView();
    }
    setView() {
        appendChildren(this.view, [
            addClasses(createHeadingText('Poly login', { bold: true }), 'loginView_heading'),
            this.user = createInputBar({ placeholder: 'User' }),
            this.password = createInputBar({type: 'password', placeholder: 'Password' }),
            // addEvent(addClasses(createButton('get users'), 'loginView_addButton','loginView_button'), ()=>{this.getUsers()}),
            addEvent(addClasses(createButton('test user'), 'loginView_addButton','loginView_button'), ()=>{this.testUsers()}),
            
        ])
    }

    async getUsers(){
        console.log(await getUsers())
    }
    async testUsers(){
        console.log(await systemLogin(this.user.value, this.password.value, 
            //()=>{const close = this.parentProps.displayBox(appendChildren(createPillBox(), [createHeadingText('Login Successfull'), addEvent(createButton('close'),()=>close())]))},
            () => {this.parentProps.setNavState(routes.SESSIONVIEW)} ,
            ()=>{const close = this.parentProps.displayBox(appendChildren(createPillBox(), [createHeadingText('Login failed. Please check user and password and try again.'), addEvent(createButton('close'),()=>close())]))}))
    }
}
