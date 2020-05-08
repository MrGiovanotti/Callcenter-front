import Swal from 'sweetalert2';

export class AlertUtils {

  private static ERROR_MESSAGE = 'Ups, ocurrió un error';
  private static SUCCESS_MESSAGE = 'Bien hecho';

  private static CANCEL_ACTION_TEXT = 'No, no lo haré';
  private static CONFIRM_ACTION_TEXT = 'Sí, sí lo haré';

  static showErrorAlert(error: any): void {
    if (error.status !== 401 && error.status !== 403 && error.status !== 404) {
      Swal.fire(this.ERROR_MESSAGE,
        error[`error`][`message`],
        'error');
    }
  }

  static showSuccessAlert(jsonData: any) {
    Swal.fire(this.SUCCESS_MESSAGE, jsonData.message.concat(': ', jsonData.object.name), 'success');
  }

  static showQuestionAlert(title: string, text: string): Promise<any> {
    return Swal.fire({
      title,
      text,
      showCancelButton: true,
      icon: 'question',
      cancelButtonText: this.CANCEL_ACTION_TEXT,
      confirmButtonText: this.CONFIRM_ACTION_TEXT
    });
  }



}
