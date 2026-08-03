// Proyecto Zona Avicola (AVICOLASENA)
// Replica visual en React del sistema de escritorio (WPF/.NET) para la sustentacion.
// Autora: Scarlet Sofia Valderrama Bolaños - Ficha 3145650
// Uso useState en cada modulo porque esto es solo la vista de referencia, no la app real con base de datos.

import React, { useState } from "react";
// Foto de fondo del login (granja/gallinas), ubicada en src/logingallinas.jpeg
import fondoLogin from "./logingallinas.jpeg";
import {
  LayoutDashboard, Egg, Bird, Package, FileText, BookOpen, Settings,
  Bell, User, Camera, Pencil, Save, RotateCcw,
  Trash2, Users, Info, HelpCircle, ChevronDown, ChevronUp, Plus,
  Search, Rocket, ClipboardList, TrendingUp, Heart, Skull, DollarSign,
  Wrench, UploadCloud, Lock, Eye, EyeOff
} from "lucide-react";

// Lista de los modulos que aparecen en el menu lateral
const menuModulos = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "clasificacion", label: "Clasificacion", icon: Egg },
  { id: "gallinas", label: "Gallinas", icon: Bird },
  { id: "inventario", label: "Inventario", icon: Package },
  { id: "reportes", label: "Reportes", icon: FileText },
  { id: "manual", label: "Manual", icon: BookOpen },
  { id: "config", label: "Configuración", icon: Settings },
];

// Pantalla de Login: se muestra antes de entrar al sistema.
// En el sistema original el fondo es una foto de la granja avicola;
// aqui se aproxima con un degradado ya que esta vista solo usa useState
// (no hay autenticacion real contra base de datos).
function PantallaLogin({ onIniciarSesion }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  function manejarIngreso(e) {
    e.preventDefault();
    onIniciarSesion(usuario || "invitado");
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoLogin})` }}
    >
      {/* Capa oscura sobre la foto para que la tarjeta blanca resalte */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-sm px-8 py-8">
        <div className="flex flex-col items-center text-center mb-5">
          {/* Logo aproximado del SENA (circulo + triangulo) */}
          <div className="flex flex-col items-center mb-2">
            <div className="w-3.5 h-3.5 rounded-full bg-green-600 mb-1" />
            <div
              className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[24px] border-b-green-600"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Zona Avicola SENA</h1>
          <p className="text-sm text-gray-400 mt-1">Sistema de Gestion Avicola</p>
        </div>

        <form onSubmit={manejarIngreso}>
          <label className="text-[11px] font-semibold text-gray-500 tracking-wide">USUARIO</label>
          <div className="relative mt-1 mb-4">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full border border-green-500 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder=""
            />
          </div>

          <label className="text-[11px] font-semibold text-gray-500 tracking-wide">CONTRASEÑA</label>
          <div className="relative mt-1 mb-5">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={mostrarContrasena ? "text" : "password"}
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-9 pr-9 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            <button
              type="button"
              onClick={() => setMostrarContrasena(!mostrarContrasena)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {mostrarContrasena ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold text-sm tracking-wide rounded-lg py-2.5 mb-4"
          >
            INICIAR SESION
          </button>
        </form>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-300">o</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          onClick={() => onIniciarSesion("invitado")}
          className="w-full border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium rounded-lg py-2.5 mb-5 flex items-center justify-center gap-2"
        >
          <Eye size={15} /> Entrar como Invitado
        </button>

        <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-500 leading-relaxed">
          <p className="font-semibold text-gray-600 mb-1.5">Roles disponibles:</p>
          <p>• <b className="text-gray-700">Admin:</b> Control total del sistema</p>
          <p>• <b className="text-gray-700">Usuario:</b> Operaciones y gestion</p>
          <p>• <b className="text-gray-700">Invitado:</b> Solo visualizacion y descarga</p>
        </div>
      </div>
    </div>
  );
}

// Menu lateral izquierdo con la navegacion entre modulos
function BarraLateral({ moduloActivo, cambiarModulo, cerrarSesion }) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="w-9 h-9 rounded-md bg-green-600 flex items-center justify-center text-white font-bold text-sm">
          SN
        </div>
        <div>
          <p className="font-bold text-gray-800 leading-tight text-[15px]">Zona Avicola</p>
          <p className="text-[11px] text-green-600 font-semibold tracking-wide">SENA</p>
        </div>
      </div>
      <nav className="flex-1 px-3 pt-2 space-y-1">
        {menuModulos.map((item) => {
          const Icono = item.icon;
          const estaActivo = moduloActivo === item.id;
          return (
            <button
              key={item.id}
              onClick={() => cambiarModulo(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                estaActivo ? "bg-green-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icono size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="px-3 pb-5">
        <button
          onClick={cerrarSesion}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50"
        >
          <RotateCcw size={16} />
          Cerrar Sesion
        </button>
      </div>
    </div>
  );
}

// Encabezado superior con el titulo del modulo actual
function BarraSuperior({ title, accent, subtitle }) {
  return (
    <div className="flex items-center justify-between px-8 pt-6 pb-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {title} <span className="text-green-600">{accent}</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell size={20} className="text-gray-500" />
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">4</span>
        </div>
        <div className="flex items-center gap-2 bg-green-600 text-white pl-2 pr-4 py-1.5 rounded-full">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <User size={15} />
          </div>
          <div className="leading-tight">
            <p className="text-xs font-semibold">admin</p>
            <p className="text-[10px] text-green-100">Administrador</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tarjeta chiquita de estadistica que se repite en el Dashboard
function TarjetaEstadistica({ icon: Icono, badge, value, label, sub }) {
  return (
    <div className="bg-green-600 text-white rounded-xl p-4 relative overflow-hidden min-w-[150px]">
      <div className="flex items-center justify-between">
        <Icono size={22} />
        {badge && (
          <span className="text-[10px] bg-white/25 rounded-full px-1.5 py-0.5">{badge}</span>
        )}
      </div>
      <p className="text-3xl font-bold mt-3">{value}</p>
      <p className="text-xs font-medium mt-1">{label}</p>
      <p className="text-[10px] text-green-100">{sub}</p>
    </div>
  );
}

// Modulo 3: Panel de Control (Dashboard)
function PanelControl() {
  return (
    <div className="px-8 pb-8">
      <div className="grid grid-cols-5 gap-3 mb-5">
        <TarjetaEstadistica icon={Rocket} badge="+1" value="1" label="Lotes Activos" sub="Lotes en produccion" />
        <TarjetaEstadistica icon={Egg} badge="0%" value="0 kg" label="Consumo de Alimento" sub="Este mes" />
        <TarjetaEstadistica icon={ClipboardList} badge="+1" value="1" label="Registros Totales" sub="Todos los modulos" />
        <TarjetaEstadistica icon={Package} badge="0" value="0" label="Insumos Registrados" sub="Items en inventario" />
        <TarjetaEstadistica icon={TrendingUp} value="0%" label="Eficiencia" sub="Produccion general" />
      </div>

      <div className="flex items-center gap-2 mb-5">
        <button className="bg-green-600 text-white text-xs font-medium px-4 py-2 rounded-lg">Semanal</button>
        <button className="bg-white text-gray-500 text-xs font-medium px-4 py-2 rounded-lg border border-gray-200">Mensual</button>
        <button className="bg-white text-gray-500 text-xs font-medium px-4 py-2 rounded-lg border border-gray-200">Anual</button>
        <div className="ml-auto flex items-center gap-2 text-xs text-gray-500">
          <span>Desde: 12/06/2026</span>
          <span>Hasta: 18/06/2026</span>
          <button className="bg-green-600 text-white px-3 py-1.5 rounded-lg">Buscar</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="font-semibold text-gray-700 text-sm mb-4">Produccion de Huevos - Ultimos 7 dias</p>
          <div className="h-40 flex flex-col items-center justify-center text-gray-300">
            <LayoutDashboard size={30} />
            <p className="text-xs mt-2 text-gray-400">Sin datos registrados hoy</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="font-semibold text-gray-700 text-sm mb-4">Distribucion por Calidad</p>
          <div className="h-40 flex flex-col items-center justify-center text-gray-300">
            <Egg size={34} />
            <p className="text-xs mt-2 text-gray-400 text-center">Clasifica huevos para ver la distribucion</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="font-semibold text-gray-700 text-sm mb-4">Lotes Activos</p>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="bg-green-600 text-white text-[10px] rounded px-1.5 py-0.5 font-bold">01</span>
              <TrendingUp size={16} className="text-green-600" />
            </div>
            <p className="font-semibold text-gray-800 text-sm">juan</p>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Aves:</span><span className="font-medium text-gray-700">100</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Edad:</span><span className="font-medium text-gray-700">2 sem</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Produccion:</span><span className="font-medium text-green-600">62%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-600" style={{ width: "62%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modulo 4: Clasificacion de huevos (modo automatico con camara o manual con formulario)
function ModuloClasificacion() {
  const [modo, setModo] = useState("auto");
  const categorias = [
    { n: "JUMBO", v: 0, r: "\u226573g", dark: true },
    { n: "AAA", v: 0, r: "66-72g" },
    { n: "AA", v: 0, r: "60-65g" },
    { n: "A", v: 0, r: "53-59g" },
    { n: "B", v: 0, r: "45-52g" },
    { n: "C", v: 0, r: "<45g" },
  ];
  return (
    <div className="px-8 pb-8">
      <div className="grid grid-cols-6 gap-3 mb-5">
        {categorias.map((c) => (
          <div key={c.n} className={`rounded-xl p-4 text-center text-white ${c.dark ? "bg-green-900" : "bg-green-600"}`}>
            <p className="text-xs font-bold tracking-wide">{c.n}</p>
            <p className="text-3xl font-bold my-1">{c.v}</p>
            <p className="text-[11px] text-green-100">{c.r}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          onClick={() => setModo("auto")}
          className={`flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm ${
            modo === "auto" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"
          }`}
        >
          <Camera size={16} /> Modo Automatico
        </button>
        <button
          onClick={() => setModo("manual")}
          className={`flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm ${
            modo === "manual" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"
          }`}
        >
          <Pencil size={16} /> Modo Manual
        </button>
      </div>

      {modo === "auto" ? (
        <div className="grid grid-cols-2 gap-5">
          <div className="border-2 border-green-500 rounded-xl p-5">
            <p className="font-semibold text-green-600 flex items-center gap-2 mb-4"><Egg size={16} /> Panel de Control</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
              <p className="text-xs font-medium text-gray-600 mb-1">Lote Activo</p>
              <select className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 bg-white">
                <option>-- Seleccionar lote --</option>
              </select>
            </div>
            <button className="w-full bg-green-600 text-white text-sm font-medium py-2.5 rounded-lg mb-2">Seleccionar Camara</button>
            <p className="text-center text-xs text-amber-500 mb-3">No conectada</p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-xs font-medium text-gray-600">Estado del Sistema</p>
              <p className="text-xs text-gray-400 mt-1">Sistema listo para clasificar</p>
            </div>
            <button className="w-full bg-green-500 text-white text-sm font-medium py-2.5 rounded-lg">Capturar y Registrar</button>
          </div>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <p className="font-semibold text-gray-700 flex items-center gap-2 p-4 pb-0"><Camera size={16} /> Vista de Camara</p>
              <div className="h-48 bg-slate-800 flex flex-col items-center justify-center text-white m-4 rounded-lg">
                <Camera size={30} className="opacity-60" />
                <p className="text-sm mt-2 font-medium">Camara no conectada</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex justify-around text-center">
              <div>
                <p className="text-xs text-gray-400">Peso Detectado</p>
                <p className="text-xl font-bold text-green-600">-- g</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Categoria</p>
                <p className="text-xl font-bold text-red-400">--</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          <div className="border-2 border-green-500 rounded-xl p-5">
            <p className="font-semibold text-gray-700 flex items-center gap-2 mb-4"><Pencil size={16} /> Registro Manual</p>
            <label className="text-xs font-medium text-gray-600">Codigo del Lote *</label>
            <select className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 bg-white mt-1 mb-3">
              <option>-- Seleccionar lote --</option>
            </select>
            <div className="grid grid-cols-2 gap-3">
              {["Jumbo (\u226573g)", "AAA (66-72g)", "AA (60-65g)", "A (53-59g)", "B (45-52g)", "C (<45g)"].map((l) => (
                <div key={l}>
                  <label className="text-xs font-medium text-gray-600">{l}</label>
                  <input type="number" defaultValue={0} className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1" />
                </div>
              ))}
            </div>
            <label className="text-xs font-medium text-gray-600 block mt-3">Danados</label>
            <input type="number" defaultValue={0} className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1" />
            <button className="w-full bg-green-600 text-white text-sm font-medium py-2.5 rounded-lg mt-4">Registrar Clasificacion</button>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="font-semibold text-gray-700 mb-4">Clasificaciones Recientes</p>
            <div className="h-56 flex items-center justify-center text-xs text-gray-400">Sin registros manuales</div>
          </div>
        </div>
      )}
    </div>
  );
}

// Modulo 5: Gestion de Gallinas -> Lotes, Tratamiento, Mortalidad y Ventas
function ModuloGallinas() {
  const [tab, setTab] = useState("lotes");
  const subPestañas = [
    { id: "lotes", label: "Lotes", icon: Package },
    { id: "tratamiento", label: "Tratamiento", icon: Heart },
    { id: "mortalidad", label: "Mortalidad", icon: Skull },
    { id: "ventas", label: "Ventas", icon: DollarSign },
  ];
  return (
    <div className="px-8 pb-8">
      <div className="grid grid-cols-4 gap-3 mb-5">
        {subPestañas.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm ${
                tab === t.id ? "bg-green-600 text-white" : "bg-white text-gray-500 border border-gray-200"
              }`}
            >
              <Icon size={16} /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="border-2 border-green-500 rounded-xl p-5">
          <p className="font-semibold text-green-600 flex items-center gap-2 mb-4"><Plus size={16} />
            {tab === "lotes" && "Registrar Nuevo Lote"}
            {tab === "tratamiento" && "Nuevo Registro Sanitario"}
            {tab === "mortalidad" && "Registrar Mortalidad"}
            {tab === "ventas" && "Registrar Venta"}
          </p>
          {tab === "lotes" && (
            <div className="space-y-3">
              {["Codigo *", "Nombre *", "Cantidad *", "Galpon", "Fecha"].map((l) => (
                <div key={l}>
                  <label className="text-xs font-medium text-gray-600">{l}</label>
                  <input className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1" />
                </div>
              ))}
              <button className="w-full bg-green-600 text-white text-sm font-medium py-2.5 rounded-lg mt-2">Agregar Lote</button>
            </div>
          )}
          {tab === "tratamiento" && (
            <div className="space-y-3">
              <div><label className="text-xs font-medium text-gray-600">Lote *</label><select className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1"><option></option></select></div>
              <div><label className="text-xs font-medium text-gray-600">Tipo de Tratamiento *</label><select className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1"><option></option></select></div>
              <div><label className="text-xs font-medium text-gray-600">Descripcion</label><textarea className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1 h-20" /></div>
              <button className="w-full bg-green-600 text-white text-sm font-medium py-2.5 rounded-lg mt-2">Registrar Tratamiento</button>
            </div>
          )}
          {tab === "mortalidad" && (
            <div className="space-y-3">
              <div><label className="text-xs font-medium text-gray-600">Lote *</label><select className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1"><option></option></select></div>
              <div><label className="text-xs font-medium text-gray-600">Cantidad *</label><input className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1" /></div>
              <div><label className="text-xs font-medium text-gray-600">Causa</label><select className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1"><option></option></select></div>
              <div><label className="text-xs font-medium text-gray-600">Observaciones</label><textarea className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1 h-16" /></div>
              <button className="w-full bg-green-600 text-white text-sm font-medium py-2.5 rounded-lg mt-2">Registrar Mortalidad</button>
            </div>
          )}
          {tab === "ventas" && (
            <div className="space-y-3">
              <div><label className="text-xs font-medium text-gray-600">Lote *</label><select className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1"><option></option></select></div>
              <div><label className="text-xs font-medium text-gray-600">Cantidad *</label><input className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1" /></div>
              <div><label className="text-xs font-medium text-gray-600">Precio Unitario *</label><input className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1" /></div>
              <div><label className="text-xs font-medium text-gray-600">Cliente</label><input className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1" /></div>
              <button className="w-full bg-green-600 text-white text-sm font-medium py-2.5 rounded-lg mt-2">Registrar Venta</button>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="font-semibold text-gray-700 mb-4">
            {tab === "lotes" ? "Lotes Registrados" : tab === "tratamiento" ? "Historial de Salud" : tab === "mortalidad" ? "Historial de Mortalidad" : "Historial de Ventas"}
          </p>
          {tab === "lotes" ? (
            <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xs">01</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">juan</p>
                <p className="text-xs text-gray-400">Cantidad: 100 | Galpon: 01</p>
              </div>
              <button className="text-xs text-green-600 font-medium px-2 py-1 border border-green-200 rounded">Modificar</button>
              <button className="text-xs text-red-500 font-medium px-2 py-1 border border-red-200 rounded">Eliminar</button>
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center text-xs text-gray-400">Sin registros</div>
          )}
        </div>
      </div>
    </div>
  );
}

// Modulo 6: Inventario -> Equipos y Alimento
function ModuloInventario() {
  const [tab, setTab] = useState("equipos");
  return (
    <div className="px-8 pb-8">
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button onClick={() => setTab("equipos")} className={`flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm ${tab === "equipos" ? "bg-green-600 text-white" : "bg-white text-gray-500 border border-gray-200"}`}>
          <Wrench size={16} /> Inventario de Equipos
        </button>
        <button onClick={() => setTab("alimento")} className={`flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm ${tab === "alimento" ? "bg-green-600 text-white" : "bg-white text-gray-500 border border-gray-200"}`}>
          <Egg size={16} /> Gestion de Alimento
        </button>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="border-2 border-green-500 rounded-xl p-5">
          <p className="font-semibold text-green-600 mb-1">{tab === "equipos" ? "Agregar Equipo / Item" : "Ingreso de Alimento"}</p>
          <p className="text-xs text-gray-400 mb-3">{tab === "equipos" ? "Solo equipos y herramientas de trabajo" : "Registro de alimento ingresado al inventario"}</p>
          <div className="space-y-3">
            <div><label className="text-xs font-medium text-gray-600">{tab === "equipos" ? "Nombre del Item *" : "Nombre del Alimento *"}</label><input className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1" /></div>
            <div><label className="text-xs font-medium text-gray-600">{tab === "equipos" ? "Categoria *" : "Tipo de Alimento *"}</label><select className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1"><option></option></select></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs font-medium text-gray-600">{tab === "equipos" ? "Stock Mínimo" : "Stock Mínimo (kg)"}</label><input className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1" /></div>
              <div><label className="text-xs font-medium text-gray-600">Precio ($)</label><input className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1" /></div>
            </div>
            <div><label className="text-xs font-medium text-gray-600">{tab === "equipos" ? "Cantidad *" : "Cantidad (kg) *"}</label><input className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1" /></div>
            <button className="w-full bg-green-600 text-white text-sm font-medium py-2.5 rounded-lg">{tab === "equipos" ? "Agregar Item" : "Registrar Ingreso"}</button>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="font-semibold text-gray-700 mb-1">{tab === "equipos" ? "Inventario de Equipos" : "Ingresos de Alimento"}</p>
          <p className="text-xs text-gray-400 mb-4">{tab === "equipos" ? "Herramientas, equipos y accesorios de trabajo" : "Stock disponible por cada alimento registrado"}</p>
          <div className="h-32 flex items-center justify-center text-xs text-gray-400">Sin registros</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="border-2 border-orange-400 rounded-xl p-5">
          <p className="font-semibold text-orange-500 flex items-center gap-2 mb-1"><UploadCloud size={16} /> Registrar Salida de {tab === "equipos" ? "Equipo" : "Alimento"}</p>
          <p className="text-xs text-gray-400 mb-3">Retiro {tab === "equipos" ? "de equipos o herramientas" : "o despacho de alimento del inventario"}</p>
          <div className="space-y-3">
            <div><label className="text-xs font-medium text-gray-600">{tab === "equipos" ? "Articulo *" : "Alimento *"}</label><select className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1"><option></option></select></div>
            <div><label className="text-xs font-medium text-gray-600">Lote *</label><input className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1" /></div>
            <div><label className="text-xs font-medium text-gray-600">{tab === "equipos" ? "Cantidad a Retirar *" : "Cantidad Retirada (kg) *"}</label><input className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1" /></div>
            <div><label className="text-xs font-medium text-gray-600">Motivo</label><input className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mt-1" /></div>
            <button className="w-full bg-orange-500 text-white text-sm font-medium py-2.5 rounded-lg">Registrar Salida</button>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="font-semibold text-gray-700 mb-4">Historial de Salidas de {tab === "equipos" ? "Equipos" : "Alimento"}</p>
          <div className="h-32 flex items-center justify-center text-xs text-gray-400">Sin registros</div>
        </div>
      </div>
    </div>
  );
}

// Modulo 7: Generador de Reportes
function ModuloReportes() {
  const reportes = [
    { icon: FileText, t: "Reportes Totales", d: "Todos los registros del sistema consolidados", bg: "bg-purple-50", ic: "text-purple-500" },
    { icon: Egg, t: "Produccion de Huevos", d: "Clasificacion y totales de produccion diaria", bg: "bg-green-50", ic: "text-green-600" },
    { icon: TrendingUp, t: "Estado de Lotes", d: "Poblacion, edad y eficiencia productiva", bg: "bg-blue-50", ic: "text-blue-500" },
    { icon: Heart, t: "Salud y Tratamientos", d: "Vacunaciones y registros medicos veterinarios", bg: "bg-red-50", ic: "text-red-400" },
    { icon: Package, t: "Inventario General", d: "Stock de alimentos, medicamentos y suministros", bg: "bg-yellow-50", ic: "text-yellow-500" },
    { icon: DollarSign, t: "Reporte de Ventas", d: "Historico de ventas de gallinas y huevos", bg: "bg-pink-50", ic: "text-pink-400" },
  ];
  const [seleccionados, setSeleccionados] = useState([]);
  const alternarSeleccion = (t) => setSeleccionados((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  return (
    <div className="px-8 pb-8">
      <div className="bg-green-600 text-white rounded-xl p-6 mb-6">
        <p className="text-xl font-bold flex items-center gap-2"><FileText size={22} /> Generador de Reportes</p>
        <p className="text-sm text-green-100 mt-1">Selecciona uno o varios tipos de reporte, define el rango de fechas y genera tu documento.</p>
      </div>

      <p className="text-sm font-medium text-gray-600 mb-3">Selecciona los reportes que deseas generar</p>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {reportes.map((r) => {
          const Icon = r.icon;
          const isSel = seleccionados.includes(r.t);
          return (
            <button
              key={r.t}
              onClick={() => alternarSeleccion(r.t)}
              className={`text-left bg-white rounded-xl border p-4 transition ${isSel ? "border-green-500 ring-1 ring-green-500" : "border-gray-200"}`}
            >
              <div className={`w-10 h-10 rounded-lg ${r.bg} ${r.ic} flex items-center justify-center mb-3`}>
                <Icon size={20} />
              </div>
              <p className="font-semibold text-gray-800 text-sm">{r.t}</p>
              <p className="text-xs text-gray-400 mt-1">{r.d}</p>
            </button>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-sm font-medium text-gray-600 mb-4">Configura el rango de fechas y genera el reporte</p>
        <div className="flex items-end gap-3 flex-wrap">
          <div>
            <label className="text-xs text-gray-500">Reportes seleccionados</label>
            <p className="text-sm text-gray-700">{seleccionados.length ? seleccionados.join(", ") : "Ninguno — haz clic en las tarjetas de arriba"}</p>
          </div>
          <div className="ml-auto flex items-end gap-2">
            <div>
              <label className="text-xs text-gray-500">Fecha inicio</label>
              <input className="block text-sm border border-gray-200 rounded px-2 py-1.5 mt-1" defaultValue="1/06/2026" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Fecha fin</label>
              <input className="block text-sm border border-gray-200 rounded px-2 py-1.5 mt-1" defaultValue="18/06/2026" />
            </div>
            <button className="bg-green-100 text-green-700 text-xs font-medium px-3 py-2 rounded-lg">Este mes</button>
            <button className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg">Generar Excel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modulo 8: Manual de Usuario en formato acordeon
function ModuloManual() {
  const [seccionAbierta, setSeccionAbierta] = useState(0);
  const items = [
    "Introduccion al Sistema",
    "Panel de Control (Dashboard)",
    "Gestion de Gallinas y Lotes",
    "Clasificacion de Huevos",
    "Gestion de Inventario",
    "Generacion de Reportes",
    "Gestion de Usuarios",
    "Soporte y Contacto",
  ];
  return (
    <div className="px-8 pb-8">
      <div className="bg-green-600 text-white rounded-xl p-6 mb-6">
        <p className="text-xl font-bold flex items-center gap-2"><BookOpen size={22} /> Manual de Usuario</p>
        <p className="text-sm text-green-100 mt-1">Guia completa del Sistema de Gestion Avicola SENA</p>
      </div>
      <div className="space-y-2">
        {items.map((t, i) => (
          <div key={t} className={`rounded-xl border ${seccionAbierta === i ? "border-green-300 bg-green-50" : "border-gray-200 bg-white"}`}>
            <button onClick={() => setSeccionAbierta(seccionAbierta === i ? -1 : i)} className="w-full flex items-center justify-between px-5 py-3.5">
              <span className="font-medium text-gray-700 text-sm">{t}</span>
              {seccionAbierta === i ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </button>
            {seccionAbierta === i && (
              <div className="px-5 pb-4 text-xs text-gray-500 leading-relaxed">
                Contenido de referencia para el modulo "{t}", con pasos e indicaciones para el usuario.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Modulo 9: Configuracion del sistema (respaldo, usuarios, info)
function ModuloConfiguracion() {
  const sistema = [
    { icon: Save, t: "Respaldar BD", d: "Guardar copia de seguridad", bg: "bg-blue-50", ic: "text-blue-500" },
    { icon: FileText, t: "Restaurar BD", d: "Cargar desde copia guardada", bg: "bg-yellow-50", ic: "text-yellow-500" },
    { icon: Trash2, t: "Limpiar Historial", d: "Borrar registros de actividad", bg: "bg-red-50", ic: "text-red-400" },
    { icon: Users, t: "Gestión Usuarios", d: "Administrar usuarios del sistema", bg: "bg-green-50", ic: "text-green-600" },
  ];
  const usuarios = [
    { i: "A", n: "Administrador", u: "@admin", r: "Administrador", estado: "Activo" },
    { i: "U", n: "Usuario General", u: "@usuario", r: "Usuario", estado: "Activo" },
    { i: "V", n: "Visitante", u: "@visitante", r: "Visitante", estado: "Inactivo" },
  ];
  return (
    <div className="px-8 pb-8">
      <p className="text-sm font-semibold text-green-600 mb-3">Sistema</p>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {sistema.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.t} className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <div className={`w-11 h-11 rounded-full ${s.bg} ${s.ic} flex items-center justify-center mx-auto mb-3`}>
                <Icon size={20} />
              </div>
              <p className="font-semibold text-gray-800 text-sm">{s.t}</p>
              <p className="text-xs text-gray-400 mt-1">{s.d}</p>
            </div>
          );
        })}
      </div>

      <p className="text-sm font-semibold text-green-600 mb-3">Información</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <div className="w-11 h-11 rounded-full bg-purple-50 text-purple-400 flex items-center justify-center mx-auto mb-3">
            <Info size={20} />
          </div>
          <p className="font-semibold text-gray-800 text-sm">Info del Sistema</p>
          <p className="text-xs text-gray-400 mt-1">Ver detalles tecnicos</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <div className="w-11 h-11 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
            <HelpCircle size={20} />
          </div>
          <p className="font-semibold text-gray-800 text-sm">Acerca de</p>
          <p className="text-xs text-gray-400 mt-1">Version y creditos</p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-5 py-3 mb-6 text-xs text-yellow-700">
        <b>Advertencia</b> — Solo Administradores pueden acceder a estas opciones. Realice respaldos periodicos. Al restaurar, los datos actuales se perderan.
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-gray-800 flex items-center gap-2"><Users size={16} /> Gestión de Usuarios</p>
            <p className="text-xs text-gray-400">Administra los usuarios del sistema</p>
          </div>
          <button className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus size={15} /> Agregar Usuario
          </button>
        </div>
        <div className="relative mb-4">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
          <input placeholder="Buscar por nombre, usuario o email..." className="w-full text-sm border border-gray-200 rounded-lg pl-9 pr-3 py-2" />
        </div>
        <div className="space-y-2">
          {usuarios.map((u) => (
            <div key={u.u} className="flex items-center gap-3 border border-gray-100 rounded-lg px-4 py-3">
              <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">{u.i}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{u.n}</p>
                <p className="text-xs text-gray-400">{u.u} <span className="ml-1 text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">{u.r}</span></p>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${u.estado === "Activo" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"}`}>{u.estado}</span>
              <button className="text-xs text-blue-500 font-medium px-2 py-1 border border-blue-200 rounded">Editar</button>
              <button className="text-xs text-red-500 font-medium px-2 py-1 border border-red-200 rounded">Eliminar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Textos del encabezado segun el modulo que este activo
const textosEncabezado = {
  dashboard: ["¡Bienvenido de nuevo,", "Administrador!", "jueves, 18 de junio de 2026"],
  clasificacion: ["Modulo de", "Clasificacion", "jueves, 18 de junio de 2026"],
  gallinas: ["Gestion de", "Gallinas", "jueves, 18 de junio de 2026"],
  inventario: ["Gestion de", "Inventario", "jueves, 18 de junio de 2026"],
  reportes: ["Modulo de", "Reportes", "jueves, 18 de junio de 2026"],
  manual: ["Manual de", "Usuario", "jueves, 18 de junio de 2026"],
  config: ["Configuración", "", "Gestión y personalización del sistema"],
};

// Componente principal: arma la barra lateral + barra superior y muestra
// el modulo que corresponda segun cual este activo en el menu.
export default function ZonaAvicolaApp() {
  const [moduloActivo, setModuloActivo] = useState("dashboard");
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [tituloPrincipal, tituloSecundario, subtitulo] = textosEncabezado[moduloActivo];

  // Mientras no haya sesion iniciada (ni como usuario ni como invitado),
  // se muestra la pantalla de Login en vez del sistema.
  if (!sesionIniciada) {
    return <PantallaLogin onIniciarSesion={() => setSesionIniciada(true)} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      <BarraLateral
        moduloActivo={moduloActivo}
        cambiarModulo={setModuloActivo}
        cerrarSesion={() => setSesionIniciada(false)}
      />
      <div className="flex-1 overflow-y-auto">
        <BarraSuperior title={tituloPrincipal} accent={tituloSecundario} subtitle={subtitulo} />
        {moduloActivo === "dashboard" && <PanelControl />}
        {moduloActivo === "clasificacion" && <ModuloClasificacion />}
        {moduloActivo === "gallinas" && <ModuloGallinas />}
        {moduloActivo === "inventario" && <ModuloInventario />}
        {moduloActivo === "reportes" && <ModuloReportes />}
        {moduloActivo === "manual" && <ModuloManual />}
        {moduloActivo === "config" && <ModuloConfiguracion />}
      </div>
    </div>
  );
}