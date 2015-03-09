var varLocal = {
    setUser: function(user){
        localStorage.setItem("TVUser",user);
    },
    getUser: function () {
        return localStorage.getItem("TVUser");
    },
    removeUser: function () {
        localStorage.removeItem("TVUser");
    },

    setRol: function (rol) {
        localStorage.setItem("TVRol", rol);
    },
    getRol: function () {
        return localStorage.getItem("TVRol");
    },
    removeRol: function () {
        localStorage.removeItem("TVRol");
    }
}

var Permisos = {    
    JefeRuta: function () {
        var obj = ["dvdGestorBuses", "dvdGestorRutas", "dvdGestorConductores", "dvdVisualizarRuta", "dvdHistorialMovimiento","dvdPlanillaControl"];
        return obj;
    },
    Gerente: function () {
        var obj = ["dvdInformeRecaudoProducido", "dvdInformeVentaTarjetas", "dvdInformeRecorridos"];
    },
    Contador: function () {
        var obj = ["dvdVentaTarjetas", "dvdCrearPlanillaRecaudo"];
        return obj;
    },
    Admin: function () {
        var obj = ["dvdVentaTarjetas", "dvdCrearPlanillaRecaudo", "dvdInformeRecaudoProducido", "dvdInformeVentaTarjetas", "dvdInformeRecorridos", "dvdGestorBuses", "dvdGestorRutas", "dvdGestorConductores", "dvdVisualizarRuta", "dvdHistorialMovimiento","dvdPlanillaControl"];
        return obj;
    },
    Get: function (rol) {
        var per;        
        switch (rol) {
            case "1": per = ["dvdInformeRecaudoProducido", "dvdInformeVentaTarjetas", "dvdInformeRecorridos"];
                break;
            case "2": per = ["dvdVentaTarjetas", "dvdCrearPlanillaRecaudo"];
                break;
            case "3": per = ["dvdGestorBuses", "dvdGestorRutas", "dvdGestorConductores", "dvdVisualizarRuta", "dvdHistorialMovimiento", "dvdPlanillaControl"];                            
                break;
            case "4": per = ["dvdVentaTarjetas", "dvdCrearPlanillaRecaudo", "dvdInformeRecaudoProducido", "dvdInformeVentaTarjetas", "dvdInformeRecorridos", "dvdGestorBuses", "dvdGestorRutas", "dvdGestorConductores", "dvdVisualizarRuta", "dvdHistorialMovimiento", "dvdPlanillaControl"];
                break;
        }
        return per;
    }
}