const teamMembers = [
  { name: 'Njeri Masila', admission: '220957' },
  { name: 'Wayne Lawrence', admission: '176701' },
  { name: 'Elvis Moses', admission: '188761' },
  { name: 'Ndolo Benson', admission: '155883' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <h3 className="footer-heading">Project Team — Group 4</h3>
      <ul className="footer-team-list">
        {teamMembers.map((member) => (
          <li key={member.admission}>
            <span className="footer-member-name">{member.name}</span>
            <span className="footer-member-admission">{member.admission}</span>
          </li>
        ))}
      </ul>
    </footer>
  );
}
