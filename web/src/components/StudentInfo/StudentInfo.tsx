interface StudentInfoProps {
  className?: string
}

const StudentInfo = ({ className = '' }: StudentInfoProps) => {
  return (
    <div className={`text-center text-sm text-gray-600 ${className}`}>
      <p>Students: Pakhomov Vladislav, Grigoriev Nikita</p>
      <p>Group: P3224</p>
      <p>Variant: 24454</p>
    </div>
  )
}

export default StudentInfo
