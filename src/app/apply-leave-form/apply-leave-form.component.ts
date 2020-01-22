import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concatMap } from 'rxjs/operators';
import { WorkflowService } from 'src/app/workflow-service.service';

@Component({
  selector: 'apply-leave-form',
  templateUrl: './apply-leave-form.component.html',
  styleUrls: ['./apply-leave-form.component.css']
})
export class ApplyLeaveFormComponent implements OnInit {
  @Output() taskChanged = new EventEmitter<string>();
  registerForm: FormGroup;
  submitted = false;
  workflowProcessId: string;
  processInstanceId: string;

  constructor(private _workflowService: WorkflowService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  applyLeave() {
    this._workflowService.getWorkflowProcess(this._workflowService.selectedWorkflow.key).pipe(
      concatMap((process: any) => {
        this.workflowProcessId = process.data[0].id;
        return this._workflowService.getStartForm(this.workflowProcessId);
      }),
      concatMap((startForm: any) => {
        let data = {
          "values": {
            "txtNameId": "hemendra",
            "numberOfDaysId": 3
          },
          "formId": startForm.id,
          "processDefinitionId": this.workflowProcessId,
          "name": "test-hem-apply-leave - January 21st 2020"
        }
        return this._workflowService.createProcessInstance(data);
      }),
      concatMap((processInstance: any) => {
        this.processInstanceId = processInstance.id;
        this._workflowService.selectedProcessInstanceId = this.processInstanceId;
        let data = {
          "sort": "created-desc",
          "page": 0,
          "appDefinitionKey": processInstance.key,
          "state": "running"
        }
        return this._workflowService.getProcessInstances(data)
      })
    ).subscribe((resultData: any) => {
      console.log(resultData);

      let data = {
        "processInstanceId": this._workflowService.selectedProcessInstanceId
      };
      this._workflowService.getTasks(data).subscribe((tasks: any) => {
        this._workflowService.tasks = tasks.data[0];
        this._workflowService.completeTask().subscribe((result: any) => {
          console.log(result);
          this.taskChanged.emit(tasks.data.length > 0 ? tasks.data[0].formKey : 'apply-leave-form');
        });
      })
    });
  }

  // login() {
  //   this._workflowService.login().subscribe((result:any)=> {
  //     console.log(result);
  //     this._workflowService.testLogin().subscribe((response: any)=> {
  //       console.log(response);
  //     });
  //   });
  // }

  saveForm() {
    let applyFormJson = {
      "name": "Apply Leave Form",
      "key": "apply-leave-form",
      "description": "Apply leave",
      "modelType": 2 // modelType 2 is for forms models
    };

    this._workflowService.createNewForm(applyFormJson).subscribe((result: any) => {
      console.log("created form result");
      console.log(result);
      let formJson = {
        "reusable": false,
        "newVersion": false,
        "comment": "",
        "formRepresentation": {
          "id": result.id,
          "name": result.name,
          "key": result.key,
          "description": result.description,
          "version": result.version,
          "lastUpdatedBy": result.lastUpdatedBy,
          "lastUpdated": result.lastUpdated,
          "formDefinition": {
            "name": result.name,
            "key": result.key,
            "fields": [
              {
                "type": "text",
                "name": "Name",
                "required": true,
                "id": "txtNameId",
                "overrideId": true,
                "placeholder": "Name"
              },
              {
                "type": "integer",
                "name": "Number of days",
                "required": true,
                "id": "numberOfDaysId",
                "overrideId": true,
                "placeholder": "No. of days"
              }
            ]
          }
        },
        "formImageBase64": ""
      }

      this._workflowService.updateExistingForm(formJson).subscribe((response: any) => {
        console.log(response);
      });
    });
  }
}
