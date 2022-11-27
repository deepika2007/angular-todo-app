import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-blog',
  // animations: [myNgIfAnimation] ,
  templateUrl: './create-blog.component.html',
  // styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent implements OnInit {
  public createBlog: FormGroup;
  public isEditId: any;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.setBlogData(),
      this.route.params.subscribe((param) => {
        if (param['id']) {
          this.api.getByIdBlog(param['id']).subscribe((data) => {
            if (data.status) {
              this.isEditId = data?.result._id;
              this.createBlog.patchValue(data?.result);
            }
          });
        }
      });
  }
  setBlogData() {
    this.createBlog = this.fb.group({
      title: ['q', Validators.required],
      description: ['s', Validators.required],
      author: ['r', Validators.required],
      thumbnail: [null],
    });
  }
  onFileSelect(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.createBlog.get('thumbnail')?.setValue(file);
    }
  }
  async onSubmit() {
    const formData = new FormData();
    formData.append('title', this.createBlog.value.title);
    formData.append('description', this.createBlog.value.description);
    formData.append('author', this.createBlog.value.author);
    formData.append('thumbnail', this.createBlog.get('thumbnail')?.value);
    console.log(formData,this.createBlog)
    if (this.isEditId) {
      this.api
        .editBlog(this.isEditId, formData)
        .subscribe((data) => {
          console.log(data)
          this.router.navigate(['/']);
        });
    } else {
      try {
        const data = await this.api.createBlog(formData);
        if (data.status) this.router.navigate(['/']);
        else {
          this.toastr.error('Something went wrong');
        }
      } catch (e: any) {
        this.toastr.error(e?.error, 'Error');
      }
    }
  }
}
