const Menu = () => {
  return (
    <nav aria-label="Menú principal" className="menu">
      <div className="menu-container">
        <span className="logo">Logo</span>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/">Acerca de</a></li>
          <li><a href="/">Contacto</a></li>
          
        </ul>

        <a href="/registro" className="register-button">Registrarse</a>
      </div>
    </nav>
  );
};

export default Menu;