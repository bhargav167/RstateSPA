import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'; 
import { PostPropertiesComponent} from './PostProperties.component'

const routes: Routes = [
    { path: '', component: PostPropertiesComponent } 
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PostPropertiesRoutingModule { }