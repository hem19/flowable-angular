import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  public tasks: any;
  public formKey: string = "frmApplyLeave";
  public selectedWorkflow: any;
  public selectedProcessInstanceId: any;
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  httpOptionsWithBasicAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:test')
    })
  };

  constructor(private _httpClient: HttpClient) { }

  public getTasks(tasksData: any) {
    let endpoint = '/flowable-task/app/rest/query/tasks';
    
    return this._httpClient.post(endpoint, tasksData, this.httpOptions);
  }

  public login() {
    let loginEndPoint = '/flowable-idm/app/authentication';
    let formData = new FormData();
    formData.append("j_username","admin");
    formData.append("j_password", "test");
    formData.append("_spring_security_remember_me", "true");
    formData.append("submit", "Login");
    
    return this._httpClient.post(loginEndPoint, formData);
  }

  public testLogin() {
    let testLoginPoint = '/flowable-idm/app/rest/authenticate';

    return this._httpClient.get(testLoginPoint, this.httpOptions);
  }

  public getWorkflows() {
    let workflowEndPoint = "/flowable-task/app/rest/runtime/app-definitions";

    return this._httpClient.get(workflowEndPoint, this.httpOptions);
  }

  public getWorkflowProcess(workflowKey: string) {
    let processDefEndPoint = "/flowable-task/app/rest/process-definitions"
    let params = new HttpParams();
    params.append("latest", "true");
    params.append("appDefinitionKey", workflowKey);

    return this._httpClient.get(processDefEndPoint, {headers: this.httpOptions.headers, withCredentials: this.httpOptions.withCredentials, params: params} );
  }

  public getStartForm(processId: string) {
    let startFormEndPoint = "/flowable-task/app/rest/process-definitions/" + processId + "/start-form";

    return this._httpClient.get(startFormEndPoint, this.httpOptions);
  }

  public createProcessInstance(data: any) {
    let createProcessEndPoint = "/flowable-task/app/rest/process-instances/";

    return this._httpClient.post(createProcessEndPoint, data, this.httpOptions);
  }

  public getProcessInstances(data: any) {
    let startProcessEndpoint = "/flowable-task/app/rest/query/process-instances/";

    return this._httpClient.post(startProcessEndpoint, data);
  }

  public completeTask() {
    let completeTaskEndPoint = '/flowable-task/process-api/runtime/tasks/' + this.tasks.id;
    let data = {
      "action": "complete"
    }

    return this._httpClient.post(completeTaskEndPoint, data, this.httpOptionsWithBasicAuth);
  }

  public createNewForm(newFormJson: any) {
    let formCreateEndpoint = '/flowable-modeler/app/rest/models';    
    
    return this._httpClient.post(formCreateEndpoint, newFormJson, this.httpOptions);
  }

  public updateExistingForm(formJson: any) {
    let formUpdateEndpoint = '/flowable-modeler/app/rest/form-models/' + formJson.formRepresentation.id;    
        
    return this._httpClient.put(formUpdateEndpoint, formJson, this.httpOptions);
  }
}
