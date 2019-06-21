import Vue from 'vue'
import 'mint-ui/lib/style.css'
/* 引入组件 */
import { Tabbar, TabItem, Field, Button, MessageBox, Header} from 'mint-ui';

Vue.component('mt-tabbar', Tabbar)
Vue.component('mt-tab-item', TabItem)
Vue.component('mt-field', Field)
Vue.component('mt-button', Button)
Vue.component('mt-header', Header)

Vue.prototype._MessageBox = MessageBox;