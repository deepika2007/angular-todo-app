import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css'],
})
export class AddItemsComponent implements OnInit {
  public blogs = [] as any;
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router,
    ) {}
  ngOnInit(): void {
    this.getAllBlog()
  }
  createRoute(){
    this.router.navigate(['/blog/create'])
  }
  getAllBlog(){
    this.api.blogResponse().then((data: any) => (this.blogs = data));
  }
 
  deleteBlog(id: any) {
    if(confirm('You want to delete this blog ?')){
      this.api.deleteBlog(id).subscribe((data:any)=> {
        if(data.status){
          this.getAllBlog()
          this.toastr.success('Blog Deleted')
        }
        else{alert('something went wrong')}
      });
    }
  }
}
