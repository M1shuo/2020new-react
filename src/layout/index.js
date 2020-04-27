import BasicLayout from './basicLayout/BasicLayout';
import ClassicLayout from './classicLayout/ClassicLayout';
import TopLeftLayout from './topLeftLayout/TopLeftLayout';
import AppLayout from './appLayout/AppLayout';

const layouts = {
    base: BasicLayout,
    classic: ClassicLayout,
    topLeft: TopLeftLayout,
    // FIXME: 准备移除app,单独创建一个移动端框架
    app: AppLayout
}
export default layouts;