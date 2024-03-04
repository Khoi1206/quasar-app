import { getI18n } from 'src/boot/i18n';

const { t } = getI18n().global;

export function vRequired(value: unknown) {
  return !!value || t('data_is_required');
}

export function vEmail(value: unknown) {
  const result =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(value)
    );
  if (result) {
    return true;
  }
  return t('invalid_', [t('email')]);
}

export function vMinLen(value: unknown, min: number) {
  if (String(value).length >= min) {
    return true;
  }
  return t('data_needs_to_be_at_least_characters', [min]);
}

export function vMaxLen(value: unknown, max: number) {
  if (String(value).length <= max) {
    return true;
  }
  return t('data_needs_to_be_characters or less', [max]);
}

export function vMinNumeric(value: unknown, min: number) {
  if (Number(value) >= min) {
    return true;
  }
  return t('data_needs_to_be_a_numeric_value_equal_to_or_higher than', [min]);
}

export function vMaxNumeric(value: unknown, max: number) {
  if (Number(value) <= max) {
    return true;
  }
  return t('needs_to_be_a_numeric_value_equal_to_or_lower_than', [max]);
}
