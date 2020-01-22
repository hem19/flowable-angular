import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WorkflowService } from 'src/app/workflow-service.service';

@Component({
  selector: 'approve-leave-form',
  templateUrl: './approve-leave-form.component.html',
  styleUrls: ['./approve-leave-form.component.css']
})
export class ApproveLeaveFormComponent implements OnInit {
  @Output() taskChanged = new EventEmitter<string>();

  constructor(private _workflowService: WorkflowService) { }

  ngOnInit() {
  }

  approveLeave() {    
    let data = {
      "processInstanceId": this._workflowService.selectedProcessInstanceId
    };

    this._workflowService.getTasks(data).subscribe((tasks: any) => {
      this._workflowService.tasks = tasks.data[0];
      this._workflowService.completeTask().subscribe((result: any) => {
        console.log(result);
        this.taskChanged.emit(tasks.data.length > 0 ? tasks.data[0].formKey : 'apply-leave-form');        
      });
    });    
  }

  saveForm() {
    let applyFormJson = {
      "name": "Approve Leave Form",
      "key": "approve-leave-form",
      "description": "Approve leave",
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
              },
              {
                "type": "text",
                "name": "Remarks",
                "required": true,
                "id": "txtRemarkId",
                "overrideId": true,
                "placeholder": "Remarks"
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
