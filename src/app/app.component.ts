import { Component } from '@angular/core';
import {WorkflowService} from 'src/app/workflow-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flowable-angular';
  isLoggedIn: boolean = false;
  workflows: Array<any> = [];
  selectedWorkflow: any;

  constructor(private _workflowService: WorkflowService) {
    this._workflowService.login().subscribe((result: any) => {
      console.log("login result");
      console.log(result);

      this._workflowService.testLogin().subscribe((response: any) => {
        console.log("test login response");
        console.log(response);

        this.isLoggedIn = true;

        this._workflowService.getWorkflows().subscribe((workflowsResult: any) => {
          this.workflows = workflowsResult.data;
          this.selectedWorkflow = this.workflows[1];
          this._workflowService.selectedWorkflow = this.selectedWorkflow;
        });
      });
    });
  }

  onSelectedWorkflowChanged() {
    console.log(this.selectedWorkflow);
  }
}
