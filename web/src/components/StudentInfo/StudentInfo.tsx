interface StudentInfoProps {
  className?: string
}

const StudentInfo = ({ className = '' }: StudentInfoProps) => {
  return (
    <div className={`space-y-0.5 text-sm text-gray-600 ${className}`}>
      <p className="font-medium text-gray-900">
        Students:{' '}
        <span className="font-normal text-gray-600">
          Pakhomov Vladislav, Grigoriev Nikita
        </span>
      </p>
      <p>
        <span className="font-medium text-gray-900">Group:</span>{' '}
        <span className="font-mono">P3224</span>
      </p>
      <p>
        <span className="font-medium text-gray-900">Variant:</span>{' '}
        <span className="font-mono">24454</span>
      </p>
    </div>
  )
}

export default StudentInfo
