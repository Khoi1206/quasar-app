import { Dialog, Notify } from 'quasar';
import { getI18n } from 'src/boot/i18n';
import { version } from '../../package.json';

const { t } = getI18n().global;

export function notifyError(msg: string) {
  Notify.create({
    type: 'negative',
    message: msg,
    position: 'top-right',
  });
}

export function notifySuccess(msg: string) {
  Notify.create({
    type: 'positive',
    message: msg,
    position: 'top-right',
  });
}

export function dialogDelete() {
  return Dialog.create({
    title: t('delete'),
    message: t('want_delete'),
    cancel: true,
  });
}

export function getAppVersion() {
  return version;
}
