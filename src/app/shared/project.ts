export interface Project {

  project_id: string;
  project_name: string;
  topic?: string | null;
  deadline?: string | null;
  milestone_name?: Array<string>;

}
