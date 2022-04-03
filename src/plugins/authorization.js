import Vue from 'vue'
import store from '@/store'

import { Role } from '@/enums/roles'

const LiaxRoles = {
  install (Vue, options) {
    Vue.prototype.hasRoles = function (roles) {
      if (!store.getters.isAuth) return false

      if (Array.isArray(roles) && !roles.length) {
        return true
      }

      const permissions = store.getters.user.permissions

      if (permissions !== undefined && Array.isArray(permissions) && Array.isArray(roles)) {
        return roles.some(role => permissions.includes(role))
      }

      return false
    }
    Vue.prototype.usuarioNivel1 = function () {
      return this.hasRoles([Role.NIVEL_1, Role.NIVEL_2])
    }
    Vue.prototype.usuarioNivel2 = function () {
      return this.hasRoles([Role.NIVEL_2])
    }
  }
}

Vue.use(LiaxRoles)
