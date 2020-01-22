import { Component, OnInit, Input } from '@angular/core';
import {WorkflowService} from 'src/app/workflow-service.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  formKey: string = "noTasks";

  constructor(private _workflowService: WorkflowService) {     
  }

  ngOnInit() {
    let data = {
      "processInstanceId": this._workflowService.selectedProcessInstanceId
    };

    this._workflowService.getTasks(data).subscribe((result: any) => {
      console.log(result);
      this._workflowService.tasks = result.data[0];
      this.formKey = result.data.length > 0 ? result.data[0].formKey : this.formKey;
    })
  }

  onTaskChanged(formKey: string) {
    this.formKey = formKey; 
  }
}
