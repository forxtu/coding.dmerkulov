import Vue from 'vue';

export const capitalize = Vue.filter('capitalize', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
})

export const removeDashes = Vue.filter('remove-dashes', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.replace(/-/g, ' ');
})

export const uppercase = Vue.filter('uppercase', function(value) {
  if(!value) return '';
  value = value.toString();
  return value.toUpperCase();
})
